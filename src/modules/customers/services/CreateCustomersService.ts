import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomersService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const findEmail = await customersRepository.findByEmail(email);

        if (findEmail) {
            throw new AppError('Email already exists', 400);
        }

        const newCustomer = await customersRepository.create({
            name,
            email,
        });
        return newCustomer;
    }
}

export default CreateCustomersService;
