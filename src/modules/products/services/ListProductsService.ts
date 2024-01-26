import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const productsCache = await redisCache.recover<Product[]>(
            'sales-api-PRODUCT_LIST',
        );

        if (productsCache) return productsCache;

        const products = await productsRepository.find();

        await redisCache.save('sales-api-PRODUCT_LIST', products);

        return products;
    }
}

export default ListProductService;
