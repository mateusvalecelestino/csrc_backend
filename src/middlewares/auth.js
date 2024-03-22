import httpStatusCode from '../utils/HttpStatusCode';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User'; // Importa o dotenv

// Middleware para verificar se o token do usuário é válido
export default async (req, res, next) => {
    const { authorization } = req.headers; // Guarda o token de headers

    // Verifica se foi mandado um token
    if (!authorization)
        return res
            .status(httpStatusCode.UNAUTHORIZED)
            .json({ message: 'autenticação necessária!' });

    const token = authorization.split(' ')[1]; // Separa o token da palavra Bearer
    try {
        const userData = jwt.verify(token, process.env.TOKEN_SECRET); // Verifica o token
        const { id, user_type, employee } = userData;

        const user = await User.findByPk(id, {
            attributes: ['active'],
        }); // Busca os dados do usuário no banco

        // Verifica se o usuário ainda é activo no banco
        if (!user || !user.active)
            return res
                .status(httpStatusCode.UNAUTHORIZED)
                .json({ message: 'Acesso negado sua conta foi desactivada.' });

        // Adiciona as info do usuário na requisição
        req.userId = id;
        req.userType = user_type;
        req.userEmployee = employee;
        return next();
    } catch (e) {
        return res
            .status(httpStatusCode.BAD_REQUEST)
            .json({ message: 'Token expirado ou inválido.' });
    }
};
