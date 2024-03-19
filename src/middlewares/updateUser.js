import httpStatusCode from "../utils/HttpStatusCode";
import UserTypes from "../utils/UserTypes";
// Middleware para verificar se o user é admin
export default (req, res, next) => {
    // Verifica se o usuário é admin ou está requisitando edição de sua conta
    if ((req.userType !== UserTypes.ADMIN) && (parseInt(req.params.id) !== req.userId)) return res.status(httpStatusCode.UNAUTHORIZED).json({message: "Acesso não autorizado!"});
    return next();
}