import { Router } from 'express';
import OrdersRoutes from '@modules/orders/routes/OrdersRoutes';
import CostumersRoutes from '@modules/customers/routes/CostumersRoutes';
import ProfileRoutes from '@modules/users/routes/ProfileRoutes';
import PasswordRoutes from '@modules/users/routes/PasswordRoutes';
import UserAvatarRoutes from '@modules/users/routes/UserAvatarRoutes';
import SessionsRoutes from '@modules/users/routes/SessionsRoutes';
import ProductsRoutes from '@modules/products/routes/ProductsRoutes';
import UserRoutes from '@modules/users/routes/UserRoutes';

const router = Router();

router.use('/products', ProductsRoutes);
router.use('/users', UserRoutes);
router.use('/sessions', SessionsRoutes);
router.use('/avatar', UserAvatarRoutes);
router.use('/password', PasswordRoutes);
router.use('/profile', ProfileRoutes);
router.use('/costumers', CostumersRoutes);
router.use('/orders', OrdersRoutes);

export default router;
