import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import errorHandler from "../middlewares/errorHandler";
class Tokens {
    async create(req, res) {
        try {

            const {password = "", email = ""} = req.body;
            const regExStrongPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,255})/g;
            const authErrorMessage = { message: "email e/ou senha são inválidos!" };

            if (!email || !password) return res.status(httpStatusCode.BAD_REQUEST).json({ message: "email e senha são obrigatórios!" });

            // Verifica se é um email válido ou se a senha é forte
            if (!isEmail(email) || !regExStrongPassword.test(password)) return res.status(httpStatusCode.BAD_REQUEST).json(authErrorMessage)

            const user = await User.findOne({
                where: {active: 1, email},
                attributes: ['id', 'name', 'password_hash', 'user_type',]
            });
            if (!user) return res.status(httpStatusCode.BAD_REQUEST).json(authErrorMessage);
            if (!(await user.isValidPassword(password))) return res.status(httpStatusCode.BAD_REQUEST).json(authErrorMessage);

            const {id, name, user_type} = user;

            // Cria o token
            const token = jwt.sign({id, name, user_type}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            return res.json({ token });
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
}

export default new Tokens; // exporta o objecto da classe