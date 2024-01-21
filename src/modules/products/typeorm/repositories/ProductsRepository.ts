import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findAllByIds(productIds: string[]): Promise<Product[]> {
        const existProducts = await this.find({
            where: {
                id: In(productIds),
            },
        });

        return existProducts;
    }
}

export default ProductsRepository;
