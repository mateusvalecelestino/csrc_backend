import Employee from "../models/Employee";
import errorHandler from "../middlewares/errorHandler";
import Patient from "../models/Patient";
import httpStatusCode from "../utils/HttpStatusCode";

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
    //         if (!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de funcionário inválido."});
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

            if (!created) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Paciente já existe."});

            await t.commit(); // Commit da transaction
            const {full_name, fathers_name, mothers_name, gender, birth_date, street, created_by} = patient;
            return res.json({patient: {full_name, fathers_name, mothers_name, gender, birth_date, street, created_by}});
        } catch (error) {
            await t.rollback(); // Rollback da transaction
            errorHandler(error, req, res);
        }
    }


    // async put(req, res) {
    //     const t = await Employee.sequelize.transaction();
    //     try {
    //         if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Id de funcionário inválido."});
    //         const employee = await Employee.findByPk(req.params.id);
    //         if (!employee) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Funcionário não existe."});
    //
    //         const {role_id, specialty_id} = req.body;
    //
    //         // Verifica se o cargo e especialidade enviados existem
    //         if (!Number.isInteger(role_id) || !(await Role.findByPk(role_id, {attributes: ['id']}))) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Cargo de funcionário inválido."})
    //         if (!Number.isInteger(specialty_id) || !(await Specialty.findByPk(specialty_id, {attributes: ['id']}))) return res.status(httpStatusCode.BAD_REQUEST).json({message: "Especialidade de funcionário inválida."})
    //
    //         // Remoção de campos não definíveis
    //         delete req.body.id;
    //         delete req.body.active;
    //         delete req.body.user_id;
    //         delete req.body.created_by;
    //
    //         // Adição dos dados do criador
    //         req.body.updated_by = req.userId;
    //
    //         // Update do employee
    //         await employee.update(req.body, {transaction: t});
    //
    //         const {id, full_name, birth_date, gender, order_number} = employee;
    //         await t.commit(); // Finalização da transaction
    //         return res.json({
    //             employee: {
    //                 id,
    //                 full_name,
    //                 birth_date,
    //                 gender,
    //                 order_number
    //             }
    //         });
    //
    //     } catch (error) {
    //         console.log(error);
    //         await t.rollback(); // Rollback da transaction
    //         errorHandler(error, req, res);
    //     }
    // }

}

export default new Patients; // exporta o objecto da classe