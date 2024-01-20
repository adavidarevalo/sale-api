import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<void> {
        const { password, token } = request.body;

        const resetPasswordService = new ResetPasswordService();

        await resetPasswordService.execute({
            token,
            password,
        });
    }
}

export default ResetPasswordController;
