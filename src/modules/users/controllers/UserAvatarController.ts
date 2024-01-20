import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserAvatarController {
    public async updateAvatar(request: Request, response: Response) {
        const { userId } = request;

        const updateUserAvatarService = new UpdateUserAvatarService();

        const user = await updateUserAvatarService.execute({
            user_id: userId,
            avatarFilename: request.file!.filename,
        });

        return response.json(user);
    }
}

export default UserAvatarController;
