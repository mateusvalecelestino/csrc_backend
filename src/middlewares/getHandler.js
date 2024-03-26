import httpStatusCode from '../utils/HttpStatusCode';
import { Op } from 'sequelize';
// Middleware para tratar de request por demanda
export default (req, res, next) => {
  let { size = '10', page = '1', search = '' } = req.query;

  // # → Validação dos parâmetros de carregamento
  size = parseInt(size);
  page = parseInt(page);
  if (isNaN(size) || isNaN(page) || size < 1 || page < 1) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: 'Parâmetros de carregamento inválidos.' });
  }

  const offset = (page - 1) * size; // Cálculo do offset
  const whereClause = {}; // Definição da claúsula where

  // Verificação se existe termo de busca e se é um nome
  if (search) {
    if (!/^[A-Za-zÀ-ú\s]+$/.test(search))
      return res.status(httpStatusCode.NO_CONTENT).json({});

    // Array de rotas cujo termo de é no campo full_name
    const fullNamesSearch = ['/employees', '/patients'];

    if (fullNamesSearch.includes(req.baseUrl)) {
      whereClause.full_name = { [Op.like]: `%${search}%` };
    } else if (req.baseUrl === '/users') {
      whereClause.username = { [Op.like]: `%${search}%` };
    } else {
      whereClause.name = { [Op.like]: `%${search}%` };
    }
  }

  // Adiciona os parâmetros de carregamento na requisição
  req.size = size;
  req.offset = offset;
  req.whereClause = whereClause;

  next(); // Envia a request para o próximo middleware
};
