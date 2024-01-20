import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/middleware/isAuthenticated';

const router = Router();

const usersController = new UsersController();

router.get('/', isAuthenticated, usersController.index);
router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

export default router;
