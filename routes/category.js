import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';
import auth from '../middlewares/auth';

const router = routerx();

// Agregamos las rutas necesarias para acceder a las funciones del contralador categoryColler

// post, envia una entidad a un recurso especifico
router.post('/add', auth.isUserAlmacen, categoryController.add)

// get, solicta una representacion de un recurso en específico
router.get("/query", auth.isUserAlmacen, categoryController.query);
router.get("/list", auth.isUserAlmacen, categoryController.list);

// put, reemplaza todas las representaciones actuales del recurso del destino con la carga útil de la petición
router.put("/update", auth.isUserAlmacen, categoryController.update);
router.put("/activate", auth.isUserAlmacen, categoryController.activate);
router.put("/deactivate", auth.isUserAlmacen, categoryController.deactivate);

// delete, borra un recurso en específico
router.delete("/remove", auth.isUserAlmacen, categoryController.remove);


export default router;