import httpStatusCode from "../utils/HttpStatusCode";
// Middleware para verificar se o user é admin
export default (req, res, next) => {
    const ADMIN_USER_TYPE = 1;
    if (req.userId !== 1) return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Acesso negado!"
    });
    return next();
}