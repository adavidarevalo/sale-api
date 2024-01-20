import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute(user: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(user.email);

        if (emailExists) {
            throw new AppError('This email already exists', 400);
        }

        const hashedPassword = await hash(user.password, 8);

        user.password = hashedPassword;

        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
        return newUser;
    }
}

export default CreateUserService;
