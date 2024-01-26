import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/middleware/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const router = Router();

const usersController = new UsersController();
const upload = multer(uploadConfig.multer);
const usersAvatarController = new UserAvatarController();

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

router.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.updateAvatar,
);

export default router;
