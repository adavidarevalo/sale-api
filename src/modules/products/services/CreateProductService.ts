import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('This product already exists', 400);
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
