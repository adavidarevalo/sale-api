import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const router = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

router.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
        }),
    }),
    forgotPasswordController.create,
);

router.post(
    '/reset',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
            token: Joi.string().uuid().required(),
        }),
    }),
    resetPasswordController.create,
);

export default router;
