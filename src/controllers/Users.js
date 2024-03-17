import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
import UserType from "../models/UserType";
class Users {
    async get(req, res){
        try {
            const users = await User.findAll({
                    attributes: ['users_id', 'name', 'email'], // Define os campos da tabela da table main
                    // Define as associações (joins)
                    include: [
                        // Associação com model user_types
                        {
                            model: UserType,
                            as: "type", // Referência o alias definido na assoc.
                            attributes: ['user_types_id', 'name'] // Define os campos a serem recuperados de user_types
                        }
                    ],
            });
            res.json(users);
        }catch (e) {
            res.status(httpStatusCode.SERVER_ERROR).json({ success: false, message: e.message })
        }
    }

    async post(req, post){
        try {
            post.json({success: true, message: "post funcionando..."})
        }catch (e) {
            post.status(httpStatusCode.SERVER_ERROR).json({ success: false, message: e.message })
        }
    }
}
export default new Users; // exporta o objecto da classe