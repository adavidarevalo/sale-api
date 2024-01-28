import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { Joi, Segments, celebrate } from 'celebrate';

const router = Router();

const productsController = new ProductsController();

router.get('/', productsController.index);

// router.get(
//     '/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         },
//     }),
//     productsController.show,
// );

// router.post(
//     '/',
//     celebrate({
//         [Segments.BODY]: {
//             name: Joi.string().required(),
//             price: Joi.number().precision(2).required(),
//             quantity: Joi.number().required(),
//         },
//     }),
//     productsController.create,
// );
// router.put(
//     '/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         },
//         [Segments.BODY]: {
//             name: Joi.string().required(),
//             price: Joi.number().precision(2).required(),
//             quantity: Joi.number().required(),
//         },
//     }),
//     productsController.update,
// );
// router.delete(
//     '/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         },
//     }),
//     productsController.delete,
// );

export default router;
