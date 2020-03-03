import models from "../models";

export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Item.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    query: async(req, res, next) => {
        try {
            const reg = await models.Item.findOne({ _id: req.query._id })
                .populate('category', { name: 1 });
            if (!reg) {
                res.status(404).send({
                    message: "El registro no existe"
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    list: async(req, res, next) => {
        try {
            const value = req.query.value;
            const reg = await models.Item.find({
                    $or: [
                        { name: new RegExp(value, "i") },
                        { description: new RegExp(value, "i") }
                    ]
                }, { createAt: 0 })
                .populate('category', { name: 1 })
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
            const reg = await models.Item.findByIdAndUpdate({ _id: req.body._id }, { category: req.body.category, code: req.body.code, name: req.body.name, description: req.body.description, cost: req.body.cost, stock: req.body.stock });
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
            const reg = await models.Item.findByIdAndDelete({
                _id: req.body._id
            });
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
            const reg = await models.Item.findByIdAndUpdate({ _id: req.body._id }, { status: 1 });
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
            const reg = await models.Item.findByIdAndUpdate({ _id: req.body._id }, { status: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    }
};