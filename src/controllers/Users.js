import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
import UserType from "../models/UserType";
import isInt from "validator/lib/isInt";
import errorHandler from "../middlewares/errorHandler";
import userTypes from "../utils/UserTypes";

class Users {
    async index(req, res) {
        try {
            // # → Consulta ao banco de dados
            const {count: totalUsers, rows: data} = await User.findAndCountAll({
                attributes: ['id', 'name', 'email'],
                include: [
                    {
                        model: UserType,
                        as: "type",
                        attributes: ['id', 'name']
                    }
                ],
                where: req.whereClause,
                order: [['id', 'DESC']],
                limit: req.size,
                offset: req.offset
            });

            const last_page = Math.ceil(totalUsers / req.size); // Calc. do total de páginas
            if (!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
            return res.json({last_page, data});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async show(req, res) {
        try {
            const {id} = req.params;
            if (!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "id inválido."});

            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
                include: [
                    {
                        model: UserType,
                        as: "type",
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: "creator",
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: "updater",
                        attributes: ['id', 'name']
                    }
                ],
            });

            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({message: "utilizador não existe."});
            return res.json(user);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async create(req, res) {
        try {

            // Remoção dos campos não criáveis
            delete req.body.id;
            delete req.body.active;
            delete req.body.created_at;
            delete req.body.updated_at;

            // Adiciona o usuário que fez a request como criador e actualizador
            req.body.created_by = req.userId;
            req.body.updated_by = req.userId;

            const user = await User.create(req.body);
            const {id, name, email, user_type, created_by} = user;
            return res.status(httpStatusCode.CREATED).json({user: {id, name, email, user_type, created_by}});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async put(req, res) {
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "id inválido."});
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({message: "utilizador não existe."});

            // Remoção dos campos não editáveis
            delete req.body.id;
            delete req.body.active; // Será editado noutra rota
            delete req.body.created_by;
            delete req.body.created_at;
            delete req.body.updated_at;

            // Se o usuário não for admin não poderá editar o seu tipo
            if (req.userType !== userTypes.ADMIN) delete req.body.user_type;

            // Adiciona o usuário que fez a request como actualizador
            req.body.updated_by = req.userId;

            await user.update(req.body);
            const {id, name, email, user_type, updated_by} = user;
            return res.json({user: {id, name, email, user_type, updated_by}});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async patch(req, res) {
        try {
            if (!isInt(req.params.id) || !isInt(req.body.active)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "id inválido."});
            const user = await User.findByPk(req.params.id); // Busca o usuário no banco de dados

            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({message: "utilizador não existe."});
            await user.update({active: req.body.active, updated_by: req.userId});

            const {id, name, email, user_type, updated_by} = user;
            return res.json({user: {id, name, email, user_type, updated_by}});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

}

export default new Users; // exporta o objecto da classe