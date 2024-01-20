import { Request, Response } from 'express';
import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';

class UsersController {
    public async index(request: Request, response: Response) {
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute();

        return response.json(users);
    }

    public async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    }
}

export default UsersController;
