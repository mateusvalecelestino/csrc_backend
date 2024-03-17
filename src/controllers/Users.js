import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
import UserType from "../models/UserType";
class Users {
    async get(req, res){
        try {
            const users = await User.findAll({
                    attributes: ['id', 'name', 'email'], // Define os campos da tabela da table main
                    // Define as associações (joins)
                    include: [
                        // Associação com model user_types
                        {
                            model: UserType,
                            as: "type", // Referência o alias definido na assoc.
                            attributes: ['id', 'name'] // Define os campos a serem recuperados de user_types
                        }
                    ],
            });
            res.json(users);
        }catch (e) {
            res.status(httpStatusCode.SERVER_ERROR).json({ success: false, message: e.message })
        }
    }

    async post(req, res){
        try {
            const newUser = await User.create(req.body);
            return res.status(httpStatusCode.CREATED).json({ success: true, user: newUser });
        }catch (e) {
            // Trabalhar a messages de erro
            return res.status(httpStatusCode.BAD_REQUEST).json({
               errors: e.errors.map(err => err.message)
            });
        }
    }
}
export default new Users; // exporta o objecto da classe