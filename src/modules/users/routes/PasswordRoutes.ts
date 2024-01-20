import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ForgotPasswordController from '../controller/ForgotPasswordController';

const router = Router();

const forgotPasswordController = new ForgotPasswordController();

router.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
        }),
    }),
    forgotPasswordController.create,
);

export default router;
