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
            console.log(error);
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
                        attributes: ['id', 'username']
                    },
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

            if (!employee) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});
            return res.json(employee);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }

    async create(req, res) {
        const t = await Employee.sequelize.transaction();
        try {
            // Remoção de campos não definíveis
            delete req.body.id;
            delete req.body.active;
            delete req.body.user_id;

            // Adição dos dados do criador
            req.body.created_by = req.userId;
            req.body.updated_by = req.userId;

            // Criação do model Employee
            const employee = Employee.build(req.body);

            // Realiza a validação do model excluindo o campo user_id
            await employee.validate({skip: ['user_id']});

            // Verificação de existência de role e specialty
            if (!await Role.findByPk(employee.role_id, {attributes: ['id']})) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Cargo de funcionário não existe."})
            if (!await Specialty.findByPk(employee.specialty_id, {attributes: ['id']})) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Especialidade de funcionário não existe."})

            // Salva o employee
            await employee.save({transaction: t});

            const {id, full_name, birth_date, gender, order_number, user_id} = employee;
            await t.commit(); // Finalização da transaction
            return res.status(httpStatusCode.CREATED).json({
                employee: {
                    id,
                    full_name,
                    birth_date,
                    gender,
                    order_number,
                    user_id
                }
            });
        } catch (error) {
            await t.rollback(); // Rollback da transaction
            errorHandler(error, req, res);
        }
    }

    async put(req, res) {
        const t = await Employee.sequelize.transaction();
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de funcionário inválido."});
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});

            const {role_id, specialty_id} = req.body;

            // Verifica se o cargo e especialidade enviados existem
            if (!Number.isInteger(role_id) || !(await Role.findByPk(role_id, {attributes: ['id']}))) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Cargo de funcionário inválido."})
            if (!Number.isInteger(specialty_id) || !(await Specialty.findByPk(specialty_id, {attributes: ['id']}))) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Especialidade de funcionário inválida."})

            // Remoção de campos não definíveis
            delete req.body.id;
            delete req.body.active;
            delete req.body.user_id;
            delete req.body.created_by;

            // Adição dos dados do criador
            req.body.updated_by = req.userId;

            // Update do employee
            await employee.update(req.body, {transaction: t});

            const {id, full_name, birth_date, gender, order_number} = employee;
            await t.commit(); // Finalização da transaction
            return res.json({
                employee: {
                    id,
                    full_name,
                    birth_date,
                    gender,
                    order_number
                }
            });

        } catch (error) {
            console.log(error);
            await t.rollback(); // Rollback da transaction
            errorHandler(error, req, res);
        }
    }

    async patch(req, res) {
        const t = await Employee.sequelize.transaction();
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de funcionário inválido."});

            const {active} = req.body;

            if (!Number.isInteger(active)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Estado de utilizador inválido."});

            const user = await Employee.findByPk(req.params.id, {attributes: ['id']});

            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});
            await user.update({active, updated_by: req.userId}, {transaction: t});
            await t.commit();
            const {id, full_name, updated_by} = user;
            return res.json({employee: {id, full_name, active, updated_by}});
        } catch (error) {
            await t.rollback();
            errorHandler(error, req, res);
        }
    }

}

export default new Users; // exporta o objecto da classe