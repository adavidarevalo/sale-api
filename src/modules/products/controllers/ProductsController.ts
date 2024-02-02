import { Request, Response } from 'express';
// import ListProductService from '../services/ListProductsService';
// import ShowProductService from '../services/ShowProductService';
// import CreateProductService from '../services/CreateProductService';
// import UpdateProductService from '../services/UpdateProductService';
// import DeleteProductService from '../services/DeleteProductService';
// import AppError from '@shared/errors/AppError';

class ProductsController {
    public async index(request: Request, response: Response) {
        // const listProductService = new ListProductService();

        // const products = await listProductService.execute();

        // return response.json(products);
        return response.json([]);
    }

    // public async show(request: Request, response: Response) {
    //     const { id } = request.params;

    //     const showProductService = new ShowProductService();

    //     const product = await showProductService.execute({ id });

    //     if (!product) {
    //         throw new AppError('Product not found', 404);
    //     }

    //     return response.json(product);
    // }

    // public async create(request: Request, response: Response) {
    //     const { name, price, quantity } = request.body;

    //     const createProductService = new CreateProductService();

    //     const product = await createProductService.execute({
    //         name,
    //         price,
    //         quantity,
    //     });

    //     return response.json(product);
    // }

    // public async update(request: Request, response: Response) {
    //     const { id } = request.params;

    //     const { name, price, quantity } = request.body;

    //     const updateProductService = new UpdateProductService();

    //     const product = await updateProductService.execute({
    //         id,
    //         name,
    //         price,
    //         quantity,
    //     });

    //     return response.json(product);
    // }

    // public async delete(request: Request, response: Response) {
    //     const { id } = request.params;

    //     const deleteProductService = new DeleteProductService();

    //     await deleteProductService.execute({ id });

    //     return response.json([]);
    // }
}

export default ProductsController;
