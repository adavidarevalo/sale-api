import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class ShowCustomersService {
    public async execute({ id }: IRequest): Promise<Customer | undefined> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        return customer;
    }
}

export default ShowCustomersService;
