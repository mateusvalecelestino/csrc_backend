import httpStatusCode from "../utils/HttpStatusCode";
import User from "../models/User";
class Users {
    async get(req, res){
        try {
            const users = await User.findAll();
            return res.json(users);
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