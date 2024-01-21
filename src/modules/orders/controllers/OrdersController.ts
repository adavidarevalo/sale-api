import { Request, Response } from 'express';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import CreateOrderService from '@modules/orders/services/CreateOrderService';

class OrdersController {
    public async show(request: Request, response: Response) {
        const { id } = request.params;

        const showOrderService = new ShowOrderService();

        const order = await showOrderService.execute({ id });

        return response.json(order);
    }

    public async create(request: Request, response: Response) {
        const { customer_id, products } = request.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            customer_id,
            products,
        });

        return response.json(order);
    }
}

export default OrdersController;
