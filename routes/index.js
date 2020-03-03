// Modulo enrutrador de express, permite que el Middleware devuelva promesas
import routerx from "express-promise-router";
import categoryRouter from './category';
import itemRouter from './item';
import rolRouter from './rol';
import userRouter from './user';

const router = routerx();

router.use('/category', categoryRouter);
router.use('/item', itemRouter);
router.use('/rol', rolRouter);
router.use('/user', userRouter);

export default router;