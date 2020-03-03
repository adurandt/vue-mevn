import routerx from "express-promise-router";
import itemController from "../controllers/ItemController";
import auth from '../middlewares/auth';

const router = routerx();

router.post("/add", auth.isUserAlmacen, itemController.add);
router.get("/query", auth.isUserAlmacen, itemController.query);
router.get("/list", auth.isUserAlmacen, itemController.list);
router.put("/update", auth.isUserAlmacen, itemController.update);
router.delete("/remove", auth.isUserAlmacen, itemController.remove);
router.put("/activate", auth.isUserAlmacen, itemController.activate);
router.put("/deactivate", auth.isUserAlmacen, itemController.deactivate);

export default router;