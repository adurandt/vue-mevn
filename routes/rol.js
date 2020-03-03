import routerx from "express-promise-router";
import rolController from "../controllers/RolController";

const router = routerx();

router.post("/add", rolController.add);
router.get("/query", rolController.query);
router.get("/list", rolController.list);
router.put("/update", rolController.update);
router.delete("/remove", rolController.remove);
router.put("/activate", rolController.activate);
router.put("/deactivate", rolController.deactivate);

export default router;