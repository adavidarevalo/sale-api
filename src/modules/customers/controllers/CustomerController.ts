import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import ListCustomersService from '../services/ListCustomersService';
import ShowCustomersService from '../services/ShowCustomersService';
import CreateCustomersService from '../services/CreateCustomersService';
import UpdateCustomersService from '../services/UpdateCustomersService';
import DeleteCustomersService from '../services/DeleteCustomersService';

class CustomerController {
    public async index(request: Request, response: Response) {
        const listCustomersService = new ListCustomersService();

        const customers = await listCustomersService.execute();

        return response.json(customers);
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params;

        const showCustomersService = new ShowCustomersService();

        const customer = await showCustomersService.execute({ id });

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return response.json(customer);
    }

    public async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const createCustomersService = new CreateCustomersService();

        const customer = await createCustomersService.execute({
            name,
            email,
        });

        return response.json(customer);
    }

    public async update(request: Request, response: Response) {
        const { name, email } = request.body;
        const { id } = request.params;

        const updateCustomersService = new UpdateCustomersService();

        const customer = await updateCustomersService.execute({
            id,
            name,
            email,
        });

        return response.json(customer);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.body;

        const deleteCustomersService = new DeleteCustomersService();

        await deleteCustomersService.execute({ id });

        return response.json([]);
    }
}

export default CustomerController;
