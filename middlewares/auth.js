 import tokenService from '../services/token';

 export default {
     isUserAuth: async(req, res, next) => {
         if (!req.headers.token) {
             return res.status(404).send({
                 message: "No token"
             });
         }
         const user = await tokenService.decode(req.headers.token);
         if (
             user.rol.name == "ADMINISTRADOR" ||
             user.rol.name == "ALMACEN" ||
             user.rol.name == "VENTAS"
         ) {
             next();
         } else {
             return res.status(403).send({
                 message: "No autorizado"
             });
         }
     },
     isUserAdmin: async(req, res, next) => {
         if (!req.headers.token) {
             return res.status(404).send({
                 message: "No token"
             });
         }
         const user = await tokenService.decode(req.headers.token);
         console.log("-> " + user.rol.name);
         if (user.rol.name == "ADMINISTRADOR") {
             next();
         } else {
             return res.status(403).send({
                 message: "No autorizado"
             });
         }
     },
     isUserAlmacen: async(req, res, next) => {
         if (!req.headers.token) {
             return res.status(404).send({
                 message: "No token"
             });
         }
         const user = await tokenService.decode(req.headers.token);
         if (user.rol.name == "ADMINISTRADOR" || user.rol.name == "ALMACEN") {
             next();
         } else {
             return res.status(403).send({
                 message: "No autorizado"
             });
         }
     },
     isUserVentas: async(req, res, next) => {
         if (!req.headers.token) {
             return res.status(404).send({
                 message: "No token"
             });
         }
         const user = await tokenService.decode(req.headers.token);
         if (user.rol.name == "ADMINISTRADOR" || user.rol.name == "VENTAS") {
             next();
         } else {
             return res.status(403).send({
                 message: "No autorizado"
             });
         }
     }
 };