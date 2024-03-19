import httpStatusCode from "../utils/HttpStatusCode";
import Employee from "../models/Employee";
import Role from "../models/Role";
import isInt from "validator/lib/isInt";
import errorHandler from "../middlewares/errorHandler";
import Specialty from "../models/Specialty";
import User from "../models/User";

class Users {
    async index(req, res) {
        try {
            // # → Consulta ao banco de dados
            const {count: totalEmployees, rows: data} = await Employee.findAndCountAll({
                attributes: ['id', 'full_name', 'birth_date', 'gender', 'order_number'],
                where: req.whereClause,
                order: [['id', 'DESC']],
                limit: req.size,
                offset: req.offset
            });

            const last_page = Math.ceil(totalEmployees / req.size); // Calc. do total de páginas
            if (!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
            return res.json({last_page, data});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async show(req, res) {
        try {
            const {id} = req.params;
            if (!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de funcionário inválido."});

            const employee = await Employee.findByPk(id, {
                attributes: ['id', 'full_name', 'birth_date', 'gender', 'order_number', 'created_at', 'updated_at'],
                include: [
                    {
                        model: Role,
                        as: "role",
                        attributes: ['id', 'name']
                    },
                    {
                        model: Specialty,
                        as: "specialty",
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: "user",
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

            if (!employee) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});
            return res.json(employee);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

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
    //         const user = await Employee.create(req.body);
    //         const {id, name, email, user_type, created_by} = user;
    //         return res.status(httpStatusCode.CREATED).json({user: {id, name, email, user_type, created_by}});
    //     } catch (error) {
    //         errorHandler(error, req, res);
    //     }
    // }

    async put(req, res) {
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de funcionário inválido."});
            const employee = await Employee.findByPk(req.params.id);

            if(!employee) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});

            const {role_id, specialty_id} = req.body;

            // Verifica se o cargo e especialidade enviados existem
            if(!Number.isInteger(role_id) || !(await Role.findByPk(role_id, { attributes: ['id']}))) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Cargo de funcionário inválido."})
            if(!Number.isInteger(specialty_id) || !(await Specialty.findByPk(specialty_id, { attributes: ['id']}))) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Especialidade de funcionário inválida."})

            // Remoção dos campos não editáveis
            delete req.body.id;
            delete req.body.user_id;
            delete req.body.active;
            delete req.body.created_by;
            delete req.body.created_at;
            delete req.body.updated_at;

            // Adiciona o usuário que fez a request como actualizador
            req.body.updated_by = req.userId;

            await employee.update(req.body);
            const {id, full_name, birth_date, gender, order_number, updated_by} = employee;
            return res.json({employee: {id, full_name, birth_date, gender, order_number, updated_by} });
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    // async patch(req, res) {
    //     try {
    //         if (!isInt(req.params.id) || !isInt(req.body.active)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "id inválido."});
    //         const user = await Employee.findByPk(req.params.id); // Busca o usuário no banco de dados
    //
    //         if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({message: "utilizador não existe."});
    //         await user.update({active: req.body.active, updated_by: req.userId});
    //
    //         const {id, name, email, user_type, updated_by} = user;
    //         return res.json({user: {id, name, email, user_type, updated_by}});
    //     } catch (error) {
    //         errorHandler(error, req, res);
    //     }
    // }

}

export default new Users; // exporta o objecto da classe