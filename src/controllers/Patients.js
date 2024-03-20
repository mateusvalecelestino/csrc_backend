import Employee from "../models/Employee";
import errorHandler from "../middlewares/errorHandler";
import Patient from "../models/Patient";
import httpStatusCode from "../utils/HttpStatusCode";
import isInt from "validator/lib/isInt";
import {Op} from "sequelize";

class Patients {
    // async index(req, res) {
    //     try {
    //         // # → Consulta ao banco de dados
    //         const {count: totalEmployees, rows: data} = await Employee.findAndCountAll({
    //             attributes: ['id', 'full_name', 'birth_date', 'gender', 'order_number'],
    //             where: req.whereClause,
    //             order: [['id', 'DESC']],
    //             limit: req.size,
    //             offset: req.offset
    //         });
    //
    //         const last_page = Math.ceil(totalEmployees / req.size); // Calc. do total de páginas
    //         if (!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
    //         return res.json({last_page, data});
    //     } catch (error) {
    //         console.log(error);
    //         errorHandler(error, req, res);
    //     }
    // }
    //
    // async show(req, res) {
    //     try {
    //         const {id} = req.params;
    //         if (!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de paciente inválido."});
    //
    //         const employee = await Employee.findByPk(id, {
    //             attributes: ['id', 'full_name', 'birth_date', 'gender', 'order_number', 'created_at', 'updated_at'],
    //             include: [
    //                 {
    //                     model: Role,
    //                     as: "role",
    //                     attributes: ['id', 'name']
    //                 },
    //                 {
    //                     model: Specialty,
    //                     as: "specialty",
    //                     attributes: ['id', 'name']
    //                 },
    //                 {
    //                     model: User,
    //                     as: "user",
    //                     attributes: ['id', 'username']
    //                 },
    //                 {
    //                     model: User,
    //                     as: "creator",
    //                     attributes: ['id', 'username']
    //                 },
    //                 {
    //                     model: User,
    //                     as: "updater",
    //                     attributes: ['id', 'username']
    //                 }
    //             ],
    //         });
    //
    //         if (!employee) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});
    //         return res.json(employee);
    //     } catch (error) {
    //         errorHandler(error, req, res);
    //     }
    // }

    async create(req, res) {
        const t = await Employee.sequelize.transaction(); // ínicio da transaction
        try {
            // Remoção de campos não definíveis
            delete req.body.id;
            delete req.body.created_at;
            delete req.body.updated_at;

            // Adição dos dados do criador
            req.body.created_by = req.userEmployee.id;
            req.body.updated_by = req.userEmployee.id;

            // Busca ou cria o paciente
            const [patient, created] = await Patient.findOrCreate({
                where: {
                    full_name: req.body.full_name,
                    fathers_name: req.body.fathers_name,
                    mothers_name: req.body.mothers_name,
                    gender: req.body.gender,
                    birth_date: req.body.birth_date
                },
                defaults: req.body, // Caso o paciente não seja encontrado, insira os dados
                transaction: t
            });

            // Verifica se o paciente já existe
            if (!created) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Paciente já existe."});

            await t.commit(); // Commit da transaction

            const {full_name, fathers_name, mothers_name, gender, birth_date, street, created_by} = patient;
            return res.json({patient: {full_name, fathers_name, mothers_name, gender, birth_date, street, created_by}});
        } catch (error) {
            await t.rollback(); // Rollback da transaction
            errorHandler(error, req, res);
        }
    }


    async put(req, res) {
        const t = await Employee.sequelize.transaction();
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de paciente inválido."});
            const patient = await Patient.findByPk(req.params.id);
            if (!patient) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Paciente não existe."});

            // Remoção de campos não definíveis
            delete req.body.created_by;
            delete req.body.created_at;
            delete req.body.updated_at;

            // Verifica se existem outros pacientes com dados similares
            const similarPatients = await Patient.findAll({
                where: {
                    id: {[Op.ne]: req.params.id}, // Busca por todos os pacientes excepto o paciente que está sendo actualizado
                    full_name: req.body.full_name,
                    fathers_name: req.body.fathers_name,
                    mothers_name: req.body.mothers_name,
                    gender: req.body.gender,
                    birth_date: req.body.birth_date
                }
            });

            // Verifica se foram encontrados pacientes com dados similares
            if (similarPatients.length > 0) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Já existe paciente com dados similares."});

            // Adição dos dados do actualizador
            req.body.updated_by = req.userEmployee.id;

            // Update do patient
            await patient.update(req.body, {transaction: t});

            await t.commit(); // Commit da transaction
            const {full_name, fathers_name, mothers_name, gender, birth_date, street, updated_by} = patient;
            return res.json({patient: {full_name, fathers_name, mothers_name, gender, birth_date, street, updated_by}});

        } catch (error) {
            await t.rollback(); // Rollback da transaction
            errorHandler(error, req, res);
        }
    }

    async delete(req, res) {
        const t = await Employee.sequelize.transaction();
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de paciente inválido."});
            const patient = await Patient.findByPk(req.params.id);
            if (!patient) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Paciente não existe."});

            await patient.destroy({transaction: t});
            await t.commit(); // Commit da transaction
            return res.status(httpStatusCode.NO_CONTENT).json({});
        } catch (error) {
            console.log(error);
            await t.rollback(); // Rollback da transaction
            errorHandler(error, req, res);
        }
    }

}

export default new Patients; // exporta o objecto da classe