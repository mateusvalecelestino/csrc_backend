import httpStatusCode from "../utils/HttpStatusCode";
import UserTypes from "../utils/UserTypes";
// Middleware para verificar se o user é admin
export default (req, res, next) => {
    if (req.userType !== UserTypes.ADMIN) return res.status(httpStatusCode.FORBIDDEN).json({ message: "Acesso não autorizado!" });
    return next();
}