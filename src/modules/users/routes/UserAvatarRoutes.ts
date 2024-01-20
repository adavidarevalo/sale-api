import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import UserAvatarController from '../controllers/UserAvatarController';
import isAuthenticated from '../../../shared/middleware/isAuthenticated';
import multer from 'multer';
import multerConfig from '@config/upload';

const router = Router();

const userAvatarController = new UserAvatarController();

const upload = multer(multerConfig);

router.patch(
    '/',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarController.updateAvatar,
);

export default router;
