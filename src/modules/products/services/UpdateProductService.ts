import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, ...rest }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const [product] = await productsRepository.find({ id });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        Object.assign(product, rest);
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
