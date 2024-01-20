import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import JWTConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        email: string;
        name: string;
    };
    token: string;
}

class CreateSessionService {
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordIsValid = await compare(password, user.password);

        if (!passwordIsValid) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign(JSON.stringify({ id: user.id }), JWTConfig.secret, {
            subject: user.id,
            expiresIn: JWTConfig.expiresIn,
        });

        return {
            user: {
                email: user.email,
                name: user.name,
            },
            token,
        };
    }
}

export default CreateSessionService;
