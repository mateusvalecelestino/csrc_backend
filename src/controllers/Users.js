import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
import UserType from "../models/UserType";
import isInt from "validator/lib/isInt";

class Users {
    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email'], // Define os campos da tabela da table main
                // Define as associações (joins)
                include: [
                    // Associação com model user_types
                    {
                        model: UserType,
                        as: "type", // Referência o alias definido na assoc.
                        attributes: ['id', 'name'] // Define os campos a serem recuperados de user_types
                    }
                ],
            });
            if(!users) return res.status(httpStatusCode.NO_CONTENT).json({});
            return res.json(users);
        } catch (e) {
            return res.status(httpStatusCode.SERVER_ERROR).json({ message: e.message})
        }
    }

    async show(req, res) {
        try {
            const {id} = req.params;
            if(!isInt(id)) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "id inválido." });

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

            if(!user) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "utilizador não existe." });
            return res.json(user);
        } catch (e) {
            return res.status(httpStatusCode.SERVER_ERROR).json({ message: e.message })
        }
    }

    async create(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(httpStatusCode.CREATED).json({ user });
        } catch (e) {
            // Trabalhar a messages de erro
            return res.status(httpStatusCode.BAD_REQUEST).json({
                errors: e.errors.map(err => err.message)
            });
        }
    }

    async put(req, res) {
        try {
            if (!isInt(req.params.id)) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "id inválido." });
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "utilizador não existe." });
            await user.update(req.body);
            return res.json({ user });
        } catch (e) {
            // Trabalhar a messages de erro
            console.log(e);
            return res.status(httpStatusCode.BAD_REQUEST).json({
                errors: e.errors.map(err => err.message)
            });
        }
    }
}

export default new Users; // exporta o objecto da classe