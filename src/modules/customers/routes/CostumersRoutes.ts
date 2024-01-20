import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import CustomerController from '../controllers/CustomerController';

const router = Router();

const customerController = new CustomerController();

router.get('/', customerController.index);

router.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customerController.show,
);

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customerController.create,
);
router.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customerController.update,
);
router.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customerController.delete,
);

export default router;
