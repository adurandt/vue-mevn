import routex from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = new routex();

router.post('/add', auth.isUserAdmin, userController.add);
router.get("/query", auth.isUserAdmin, userController.query);
router.get('/list', auth.isUserAdmin, userController.list);
router.put('/update', auth.isUserAdmin, userController.update);
router.delete('/remove', auth.isUserAdmin, userController.remove);
router.put('/activate', auth.isUserAdmin, userController.activate);
router.put('/deactivate', auth.isUserAdmin, userController.deactivate);
router.post('/login', userController.login);

export default router;