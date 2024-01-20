import { Router } from 'express';
import ProductsRoutes from './../../../modules/products/routes/ProductsRoutes';
import UsersRoutes from './../../../modules/users/routes/UserRoutes';
import SessionsRoutes from './../../../modules/users/routes/SessionsRoutes';
import UserAvatarRoutes from './../../../modules/users/routes/UserAvatarRoutes';
import PasswordRoutes from './../../../modules/users/routes/PasswordRoutes';
import ProfileRoutes from './../../../modules/users/routes/ProfileRoutes';
import CostumersRoutes from './../../../modules/customers/routes/CostumersRoutes';

const router = Router();

router.use('/products', ProductsRoutes);
router.use('/users', UsersRoutes);
router.use('/sessions', SessionsRoutes);
router.use('/avatar', UserAvatarRoutes);
router.use('/password', PasswordRoutes);
router.use('/profile', ProfileRoutes);
router.use('/costumers', CostumersRoutes);

export default router;
