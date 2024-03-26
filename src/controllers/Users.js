import httpStatusCode from '../utils/HttpStatusCode';
import User from '../models/User';
import UserType from '../models/UserType';
import isInt from 'validator/lib/isInt';
import errorHandler from '../middlewares/errorHandler';
import userTypes from '../utils/UserTypes';

class Users {
  async index(req, res) {
    try {
      // # → Consulta ao banco de dados
      const { count: totalUsers, rows: data } = await User.findAndCountAll({
        attributes: ['id', 'username', 'user_email'],
        include: [
          {
            model: UserType,
            as: 'type',
            attributes: ['id', 'name'],
          },
        ],
        where: req.whereClause,
        order: [['id', 'DESC']],
        limit: req.size,
        offset: req.offset,
      });

      const last_page = Math.ceil(totalUsers / req.size); // Calc. do total de páginas
      if (!data) return res.status(httpStatusCode.NO_CONTENT).json({}); // Verificação se há dados
      return res.json({ last_page, data });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!isInt(id))
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'id inválido.' });

      const user = await User.findByPk(id, {
        attributes: [
          'id',
          'username',
          'user_email',
          'created_at',
          'updated_at',
        ],
        include: [
          {
            model: UserType,
            as: 'type',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username'],
          },
          {
            model: User,
            as: 'updater',
            attributes: ['id', 'username'],
          },
        ],
      });

      if (!user)
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'utilizador não existe.' });
      return res.json(user);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async put(req, res) {
    const t = await User.sequelize.transaction();
    try {
      if (!isInt(req.params.id))
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'id inválido.' });
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'utilizador não existe.' });

      // Remoção dos campos não editáveis
      delete req.body.id;
      delete req.body.active; // Será editado noutra rota
      delete req.body.created_by;
      delete req.body.created_at;
      delete req.body.updated_at;

      // Se o usuário não for admin não poderá editar o seu tipo
      if (req.userType !== userTypes.ADMIN) delete req.body.user_type;

      // Adiciona o usuário que fez a request como actualizador
      req.body.updated_by = req.userId;

      await user.update(req.body, { transaction: t });
      await t.commit();
      const { id, username, user_email, user_type, updated_by } = user;
      return res.json({
        user: { id, username, user_email, user_type, updated_by },
      });
    } catch (error) {
      await t.rollback();
      errorHandler(error, req, res);
    }
  }

  async patch(req, res) {
    const t = await User.sequelize.transaction();
    try {
      if (!isInt(req.params.id))
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'id de usuário inválido.' });

      const { active } = req.body;

      if (!Number.isInteger(active))
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'Estado de usuário inválido.' });

      const user = await User.findByPk(req.params.id); // Busca o usuário no banco de dados

      if (!user)
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: 'utilizador não existe.' });
      await user.update({ active, updated_by: req.userId }, { transaction: t });
      await t.commit();
      const { id, username, user_email, user_type, updated_by } = user;
      return res.json({
        user: {
          id,
          username,
          user_email,
          user_type,
          active,
          updated_by,
        },
      });
    } catch (error) {
      await t.rollback();
      errorHandler(error, req, res);
    }
  }
}

export default new Users(); // exporta o objecto da classe
