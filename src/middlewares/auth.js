import httpStatusCode from "../utils/HttpStatusCode";
import jwt from "jsonwebtoken";
import 'dotenv/config' // Importa o dotenv

// Middleware para verificar se o token do usuário é válido
export default (req, res, next) => {
    const { authorization } = req.headers; // Guarda o token de headers

    // Verifica se foi mandado um token
    if(!authorization) return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false, message: "autenticação necessária!"
    })

    const token = authorization.split(' ')[1]; // Separa o token da palavra Bearer
    try {
        const userData = jwt.verify(token, process.env.TOKEN_SECRET); // Verifica o token
        const {id, user_type } = userData;
        // Adiciona as info do usuário na requisição
        req.userId = id;
        req.userType = user_type;
        return next();
    }catch (e) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success:false, message: "token expirado ou inválido."
        })
    }
}