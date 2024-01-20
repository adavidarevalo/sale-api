import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import isAuthenticated from '../../../shared/middleware/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const router = Router();

const profileController = new ProfileController();

router.use(isAuthenticated);

router.get('/', profileController.show);
router.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', { is: Joi.exist(), then: Joi.required() }),
        },
    }),
    profileController.update,
);

export default router;
