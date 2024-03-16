import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
class Users {
    async get(req, res){
        try {
        }catch (e) {
            res.status(httpStatusCode.SERVER_ERROR).json({success: false, message: "Erro ao carregar tipos de usuários. Tente mais tarde!"})
        }
    }

    async post(req, post){
        const newUser = await User.create({
            name: 'Admin First User',
            email: 'admin@admin.com',
            password: 'Admin1234@',
            type: 1,
            created_by: 1,
            updated_by: 1
        });
        post.status(httpStatusCode.CREATED).json(newUser);
    }
}
export default new Users; // exporta o objecto da classe