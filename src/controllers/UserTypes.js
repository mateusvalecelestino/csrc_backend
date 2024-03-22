import httpStatusCode from '../utils/HttpStatusCode';
import UserType from '../models/UserType';
import errorHandler from '../middlewares/errorHandler';

class UserTypes {
    async index(req, res) {
        try {
            // Carrega todos os tipos de usuários, apenas os campos passados como attributes
            const userTypes = await UserType.findAll({
                attributes: ['id', 'name', 'desc'],
                order: [['id', 'DESC']],
            });
            if (!userTypes)
                return res.status(httpStatusCode.NO_CONTENT).json({});
            return res.json(userTypes);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
}

export default new UserTypes(); // exporta o objecto da classe
