import httpStatusCode from "../utils/HttpStatusCode";
import UserType from "../models/UserType";
class UserTypes{
    async get(req, res){
        try {
            // Carrega todos os tipos de usuários, apenas os campos passados como attributes
            const userTypes = await  UserType.findAll({ attributes: ['user_types_id', 'name', 'desc'] });
            res.json(userTypes);
        }catch (e) {
            res.status(httpStatusCode.SERVER_ERROR).json({success: false, message: "Erro ao carregar tipos de usuários. Tente mais tarde!"})
        }
    }
}
export default new UserTypes; // exporta o objecto da classe