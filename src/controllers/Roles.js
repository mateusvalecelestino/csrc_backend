import httpStatusCode from "../utils/HttpStatusCode";
import Role from "../models/Role";
import User from "../models/User";
import isInt from "validator/lib/isInt";
import errorHandler from "../middlewares/errorHandler";

class Roles {
    async index(req, res) {
        try {
            // # → Consulta ao banco de dados
            const { count: totalRoles, rows: data } = await Role.findAndCountAll({
                attributes: ['id', 'name'],
                where: req.whereClause,
                order: [['id', 'DESC']],
                limit: req.size,
                offset: req.offset
            });

            const last_page = Math.ceil(totalRoles / req.size); // Calc. do total de páginas
            if(!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
            return res.json({ last_page, data });
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
    //
    async show(req, res) {
        try {
            const {id} = req.params;
            if(!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "id de cargo inválido." });

            const role = await Role.findByPk(id, {
                attributes: ['id', 'name', 'desc', 'created_at', 'updated_at'],
                include: [
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

            if(!role) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "Cargo não existe." });
            return res.json(role);
        } catch (error) {
            console.log(error);
            errorHandler(error, req, res);
        }
    }
    //
    // async create(req, res) {
    //     try {
    //
    //         // Remoção dos campos não criáveis
    //         delete req.body.id;
    //         delete req.body.active;
    //         delete req.body.created_at;
    //         delete req.body.updated_at;
    //
    //         // Adiciona o usuário que fez a request como criador e actualizador
    //         req.body.created_by = req.userId;
    //         req.body.updated_by = req.userId;
    //
    //         const user = await Role.create(req.body);
    //         const {id, name, email, user_type, created_by} = user;
    //         return res.status(httpStatusCode.CREATED).json({ user: {id, name, email, user_type, created_by} });
    //     } catch (error) {
    //         errorHandler(error, req, res);
    //     }
    // }
    //
    // async put(req, res) {
    //     try {
    //         if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "id inválido." });
    //         const user = await Role.findByPk(req.params.id);
    //         if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "utilizador não existe." });
    //
    //         // Remoção dos campos não editáveis
    //         delete req.body.id;
    //         delete req.body.active; // Será editado noutra rota
    //         delete req.body.created_by;
    //         delete req.body.created_at;
    //         delete req.body.updated_at;
    //
    //         // Se o usuário não for admin não poderá editar o seu tipo
    //         if(req.userType !== userTypes.ADMIN) delete req.body.user_type;
    //
    //         // Adiciona o usuário que fez a request como actualizador
    //         req.body.updated_by = req.userId;
    //
    //         await user.update(req.body);
    //         const {id, name, email, user_type, updated_by} = user;
    //         return res.json({ user: {id, name, email, user_type, updated_by} });
    //     } catch (error) {
    //         errorHandler(error, req, res);
    //     }
    // }

}

export default new Roles; // exporta o objecto da classe