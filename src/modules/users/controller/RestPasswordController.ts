import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class RestPasswordController {
    public async create(request: Request, response: Response) {
        const { email } = request.body;

        const sendForgotPasswordEmailService =
            new SendForgotPasswordEmailService();

        await sendForgotPasswordEmailService.execute({
            email,
        });

        return response.status(204).json();
    }
}

export default RestPasswordController;
