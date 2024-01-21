import { Router } from 'express';
import isAuthenticated from '../../../shared/middleware/isAuthenticated';
import OrdersController from '../controllers/OrdersController';
import { Joi, Segments, celebrate } from 'celebrate';

const router = Router();

const ordersController = new OrdersController();

router.post(
    '/',
    // isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    ordersController.create,
);
router.get(
    '/:id',
    // isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show,
);

export default router;
