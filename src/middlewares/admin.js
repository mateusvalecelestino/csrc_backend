import httpStatusCode from "../utils/HttpStatusCode";
import UserTypes from "../utils/UserTypes";
// Middleware para verificar se o user é admin
export default (req, res, next) => {
    if (req.userId !== UserTypes.ADMIN) return res.status(httpStatusCode.UNAUTHORIZED).json({ message: "Acesso não autorizado!" });
    return next();
}