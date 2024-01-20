import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomersService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        if (!customer) {
            throw new AppError('Customer not found.', 400);
        }

        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists) {
            throw new AppError('Customer already exists', 400);
        }

        customer.name = name || customer.name;
        customer.email = email || customer.email;
        await customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomersService;
