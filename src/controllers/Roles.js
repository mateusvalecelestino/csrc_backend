import httpStatusCode from "../utils/HttpStatusCode";
import Role from "../models/Role";
import isInt from "validator/lib/isInt";
import {Op} from "sequelize";
import errorHandler from "../middlewares/errorHandler";

class Roles {
    async index(req, res) {
        try {
            let { size = '10', page = '1', search = '' } = req.query;

            // # → Validação dos parâmetros de carregamento
            size = parseInt(size);
            page = parseInt(page);
            if (isNaN(size) || isNaN(page) || size < 1 || page < 1) {
                return res.status(httpStatusCode.BAD_REQUEST).json({ message: "Parâmetros de carregamento inválidos." });
            }

            const offset = (page - 1) * size; // Cálculo do offset
            const whereClause = {}; // Definição da claúsula where

            // Verificação se existe termo de busca e se é um nome
            if(search) {
                if(!/^[A-Za-zÀ-ú\s]+$/.test(search)) return res.status(httpStatusCode.NO_CONTENT).json({});
                whereClause.name = { [Op.like]: `${search}%` };
            }

            // # → Consulta ao banco de dados
            const { count: totalRoles, rows: data } = await Role.findAndCountAll({
                attributes: ['id', 'name'],
                where: whereClause,
                order: [['id', 'DESC']],
                limit: size,
                offset: offset
            });

            const last_page = Math.ceil(totalRoles / size); // Calc. do total de páginas
            if(!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
            return res.json({ last_page, data });
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
    //
    // async show(req, res) {
    //     try {
    //         const {id} = req.params;
    //         if(!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "id inválido." });
    //
    //         const user = await Role.findByPk(id, {
    //             attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
    //             include: [
    //                 {
    //                     model: UserType,
    //                     as: "type",
    //                     attributes: ['id', 'name']
    //                 },
    //                 {
    //                     model: Role,
    //                     as: "creator",
    //                     attributes: ['id', 'name']
    //                 },
    //                 {
    //                     model: Role,
    //                     as: "updater",
    //                     attributes: ['id', 'name']
    //                 }
    //             ],
    //         });
    //
    //         if(!user) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "utilizador não existe." });
    //         return res.json(user);
    //     } catch (error) {
    //         errorHandler(error, req, res);
    //     }
    // }
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