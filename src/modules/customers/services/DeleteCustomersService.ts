import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class DeleteCustomersService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        if (!customer) {
            throw new AppError('Customer not found.', 400);
        }

        await customersRepository.remove(customer);

        return customer;
    }
}

export default DeleteCustomersService;
