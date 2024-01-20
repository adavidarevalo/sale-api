import { Router } from 'express';
import ProductsRoutes from './../../../modules/products/routes/ProductsRoutes';
import UsersRoutes from './../../../modules/users/routes/UserRoutes';
import SessionsRoutes from './../../../modules/users/routes/SessionsRoutes';

const router = Router();

router.use('/products', ProductsRoutes);
router.use('/users', UsersRoutes);
router.use('/sessions', SessionsRoutes);

export default router;
