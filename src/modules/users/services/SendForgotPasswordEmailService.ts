import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherrealMail';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User does not exist.', 404);
        }

        const userToken = await userTokensRepository.generate(user.id);
        console.log(
            '🚀 ~ SendForgotPasswordEmailService ~ execute ~ userToken:',
            userToken,
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Reset your password',
            templateData: {
                template: `Password recovery request: ${userToken.token}`,
                variables: {
                    name: user.name,
                    token: userToken.token,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
