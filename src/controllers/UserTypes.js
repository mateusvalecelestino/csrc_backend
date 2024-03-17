import httpStatusCode from "../utils/HttpStatusCode";
import UserType from "../models/UserType";

class UserTypes {
    async index(req, res) {
        try {
            // Carrega todos os tipos de usuários, apenas os campos passados como attributes
            const userTypes = await UserType.findAll({
                attributes: ['id', 'name', 'desc'],
                order: [['id', 'DESC']]
            });
            if(!userTypes) return res.status(httpStatusCode.NO_CONTENT).json({});
            return res.json(userTypes);
        } catch (e) {
            return res.status(httpStatusCode.SERVER_ERROR).json({ message: "Erro ao carregar tipos de usuários. Tente mais tarde!" });
        }
    }
}

export default new UserTypes; // exporta o objecto da classe