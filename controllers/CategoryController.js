import models from '../models';

// export defaul, Se utuliza para exportar funciones, objetos, clases o expresiones desde archivos de script o módulos
// req = solicitud http a la función de middleware, res = argumento de respuesta http en la función de middleware, next = argumento de devolución de llamada a la funcion de middleware 
export default {
    add: async(req, res, next) => {
        try {
            //Almacena el obj req.body como documento en la coleccion Category
            const reg = await models.Category.create(req.body);
            res.status(200).json(reg);

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    query: async(req, res, next) => {
        try {
            const reg = await models.Category.findOne({ _id: req.query._id });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    list: async(req, res, next) => {
        try {
            const value = req.query.value;
            const reg = await models.Category.find({ $or: [{ name: new RegExp(value, 'i') }, { description: new RegExp(value, 'i') }] }, { createAt: 0 })
                .sort({ name: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    update: async(req, res, next) => {
        try {
            const reg = await models.Category.findByIdAndUpdate({ _id: req.body._id }, { name: req.body.name, description: req.body.description });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.Category.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.Category.findByIdAndUpdate({ _id: req.body._id }, { status: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Category.findByIdAndUpdate({ _id: req.body._id }, { status: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    }
};