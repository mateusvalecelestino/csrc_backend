import httpStatusCode from "../utils/HttpStatusCode";
import Specialty from "../models/Specialty";
import User from "../models/User";
import isInt from "validator/lib/isInt";
import errorHandler from "../middlewares/errorHandler";

class Specialties {
    async index(req, res) {
        try {
            // # → Consulta ao banco de dados
            const {count: totalSpecialties, rows: data} = await Specialty.findAndCountAll({
                attributes: ['id', 'name'],
                where: req.whereClause,
                order: [['id', 'DESC']],
                limit: req.size,
                offset: req.offset
            });

            const last_page = Math.ceil(totalSpecialties / req.size); // Calc. do total de páginas
            if (!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
            return res.json({last_page, data});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async show(req, res) {
        try {
            const {id} = req.params;
            if (!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "id de especialidade inválido."});

            const specialty = await Specialty.findByPk(id, {
                attributes: ['id', 'name', 'created_at', 'updated_at'],
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: ['id', 'username']
                    },
                    {
                        model: User,
                        as: "updater",
                        attributes: ['id', 'username']
                    }
                ],
            });

            if (!specialty) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Especialidade não existe."});
            return res.json(specialty);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async create(req, res) {
        const t = await Specialty.sequelize.transaction();
        try {
            // Remoção dos campos não criáveis
            delete req.body.id;
            delete req.body.created_at;
            delete req.body.updated_at;

            // Adiciona o usuário que fez a request como criador e actualizador
            req.body.created_by = req.userId;
            req.body.updated_by = req.userId;

            const specialty = await Specialty.create(req.body, {transaction: t});
            await t.commit();
            const {id, name, created_by} = specialty;
            return res.status(httpStatusCode.CREATED).json({role: {id, name, created_by}});
        } catch (error) {
            await t.rollback();
            errorHandler(error, req, res);
        }
    }

    async put(req, res) {
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de especialidade inválido."});
            const specialty = await Specialty.findByPk(req.params.id);
            if (!specialty) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Especialidade não existe."});

            // Remoção dos campos não editáveis
            delete req.body.id;
            delete req.body.created_by;
            delete req.body.created_at;
            delete req.body.updated_at;

            req.body.updated_by = req.userId; // Adiciona o user que realizou a request como actualizador

            await specialty.update(req.body);
            const {id, name, updated_by} = specialty;
            return res.json({user: {id, name, updated_by}});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

}

export default new Specialties;