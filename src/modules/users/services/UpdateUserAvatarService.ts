import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        if (user.avatar) {
            const userAvatarPath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarPath);
            }
        }

        user.avatar = avatarFilename;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
