import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

class ProfileController {
    public async show(request: Request, response: Response) {
        const showProfileService = new ShowProfileService();
        const user = await showProfileService.execute({
            user_id: request.userId,
        });
        return response.json(classToClass(user));
    }

    public async update(request: Request, response: Response) {
        const { name, email, password, old_password } = request.body;

        const updateProfileService = new UpdateProfileService();

        const user = await updateProfileService.execute({
            user_id: request.userId,
            name,
            email,
            password,
            old_password,
        });

        return response.json(user);
    }
}

export default ProfileController;
