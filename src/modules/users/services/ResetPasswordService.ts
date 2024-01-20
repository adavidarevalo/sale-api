import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token does not exist.', 404);
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exist.', 404);
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token has expired.', 404);
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);

        return user;
    }
}

export default ResetPasswordService;
