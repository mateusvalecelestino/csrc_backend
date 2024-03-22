import httpStatusCode from '../utils/HttpStatusCode';
// Middleware para tratar de response de erros
export default (error, req, res) => {
    // Verifica se o erro é de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
        // Mapeia os erros de validação para uma lista de mensagens
        const validationErrors = error.errors.map((err) => ({
            field: err.path,
            message: err.message,
        }));

        // Retorna os erros de validação em uma resposta JSON
        return res
            .status(httpStatusCode.BAD_REQUEST)
            .json({ errors: validationErrors });
    }

    // Verifica se o erro é uma violação de restrição única do Sequelize
    // Esse é gerado caso um campo é definido como unique e os dados a serem salvos já existam no banco
    if (error.name === 'SequelizeUniqueConstraintError') {
        // Extrai a mensagem de erro
        const message = error.errors[0].message;
        return res.status(httpStatusCode.BAD_REQUEST).json({ message });
    }
    return res
        .status(httpStatusCode.SERVER_ERROR)
        .json({ message: 'Erro interno do servidor. Tente mais tarde.' });
};
