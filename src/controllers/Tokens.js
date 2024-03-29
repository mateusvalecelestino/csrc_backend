import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import errorHandler from "../middlewares/errorHandler";
import Employee from "../models/Employee";

class Tokens {
    async create(req, res) {
        try {

            const {password = "", user_email = ""} = req.body;
            const regExStrongPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,255})/g;
            const authErrorMessage = {message: "email e/ou senha são inválidos!"};

            if (!user_email || !password) return res.status(httpStatusCode.BAD_REQUEST).json({message: "email e senha são obrigatórios!"});

            // Verifica se é um user_email válido ou se a senha é forte
            if (!isEmail(user_email) || !regExStrongPassword.test(password)) return res.status(httpStatusCode.BAD_REQUEST).json(authErrorMessage)

            const user = await User.findOne({
                include: [
                    {
                        model: Employee,
                        as: "employee",
                        attributes: ['id']
                    }
                ],
                where: {active: 1, user_email},
                attributes: ['id', 'username', 'password_hash', 'user_type',]
            });
            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json(authErrorMessage);
            if (!(await user.isValidPassword(password))) return res.status(httpStatusCode.BAD_REQUEST).json(authErrorMessage);

            const {id, username, user_type, employee} = user;

            // Cria o token
            const token = jwt.sign({
                id,
                username,
                user_type,
                employee: employee.id
            }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});
            return res.json({token, user: {id, username, user_type, employee: employee.id}});
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
}

export default new Tokens;