import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IPaginateCustomer {
    from: number;
    to: number;
    current_page: number;
    total: number;
    per_page: number;
    data: Customer[];
    prev_page: number | null;
    next_page: number | null;
}

class ListCustomersService {
    public async execute(): Promise<IPaginateCustomer> {
        const customersRepository = getCustomRepository(CustomersRepository);
        const customers = await customersRepository
            .createQueryBuilder()
            .paginate();
        return customers as IPaginateCustomer;
    }
}

export default ListCustomersService;
