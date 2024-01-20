import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {
    public async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const createSession = new CreateSessionService();

        const session = await createSession.execute({
            email,
            password,
        });

        return response.json(session);
    }
}

export default SessionController;
