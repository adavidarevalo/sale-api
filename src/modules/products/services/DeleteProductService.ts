import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const [product] = await productsRepository.find({ id });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        await productsRepository.remove(product);

        return product;
    }
}

export default DeleteProductService;
