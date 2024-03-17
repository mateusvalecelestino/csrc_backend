import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
class Tokens{
    async create(req, res){
        try {
            res.json({success: true, message: "Token route working"});
        }catch (e) {
            res.status(httpStatusCode.SERVER_ERROR).json({success: false, message: "Erro ao carregar tipos de usuários. Tente mais tarde!"})
        }
    }
}
export default new Tokens; // exporta o objecto da classe