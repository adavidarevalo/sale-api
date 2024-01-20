import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find({ id });

        if (!products) {
            throw new AppError('Product not found', 404);
        }

        return products[0];
    }
}

export default ShowProductService;
