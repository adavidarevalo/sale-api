import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);

        const costumerExist = await customersRepository.findById(customer_id);

        if (!costumerExist) {
            throw new AppError('Customer not found', 400);
        }

        const productIds = products.map(product => product.id);
        const existProducts = await productsRepository.findAllByIds(productIds);

        if (!existProducts) {
            throw new AppError('Products not found', 400);
        }

        const productNotFound = existProducts.filter(
            product => !productIds.includes(product.id),
        );

        if (productNotFound.length) {
            throw new AppError(`Products not found`, 400);
        }

        const quantityAvailable = products.filter(
            product =>
                existProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError('Quantity not available', 400);
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await ordersRepository.createOrder({
            customer: costumerExist,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updateProductQuantity = order_products.map(order_product => ({
            id: order_product.product_id,
            quantity:
                existProducts.filter(p => p.id === order_product.product_id)[0]
                    .quantity - order_product.quantity,
        }));

        await productsRepository.save(updateProductQuantity);

        return order;
    }
}

export default CreateOrderService;
