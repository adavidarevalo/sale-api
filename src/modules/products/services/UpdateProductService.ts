import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, ...rest }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const redisCache = new RedisCache();

        const [product] = await productsRepository.find({ id });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        const userToUpdate = Object.assign(product, rest);
        await productsRepository.save(userToUpdate);
        await redisCache.invalidate('sales-api-PRODUCT_LIST');

        return product;
    }
}

export default UpdateProductService;
