import models from "../models";
import bcrypt from 'bcryptjs';
import token from '../services/token';


export default {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.User.create(req.body);
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
            const reg = await models.User.findOne({ _id: req.query._id })
                .populate('rol', { name: 1 });
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
            const valueRE = new RegExp(value, 'i');
            const reg = await models.User.find({
                    $or: [
                        { name: valueRE },
                        { email: valueRE },
                        { username: valueRE }
                    ]
                }, { createAt: 0 })
                .populate('rol', { name: 1 })
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
            let password = req.body.password;
            const user = await models.User.findById({ _id: req.body._id });
            if (password != user.password) {
                req.body.password = await bcrypt.hash(req.body.password);
            }
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, {
                rol: req.body.rol,
                gender: req.body.gender,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                mobile: req.body.mobile
            }).populate("rol", { name: 1 });
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
            const reg = await models.User.findByIdAndDelete({
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
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { status: 1 }).populate("rol", { name: 1 });
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
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { status: 0 }).populate("rol", { name: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    },
    login: async(req, res, next) => {
        try {
            let user = await models.User.findOne({
                username: req.body.username,
                status: 1
            }).populate("rol", { name: 1 });
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({ user, tokenReturn });
                    console.log(user.rol.name);
                    //res.send('Usuario válido');
                } else {
                    res.status(400).send({
                        message: 'Password o usuario no válidos'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'Usuario o contraseña no válidos'
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error"
            });
            next(error);
        }
    }
};