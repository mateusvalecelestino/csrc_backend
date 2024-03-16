import Sequelize from "sequelize";
import dbConfig from "../config/database";

// Importa todos os models da bd
import UserType from "../models/UserType";
import User from "../models/User";

const connection = new Sequelize(dbConfig); // Instância a conn. com a db

// Guarda todos os models da bd
const models = [ UserType, User ];

// Insere a conexão com o banco nos models
Object.keys(models).forEach(model => {
    models[model].init(connection)
})

// Verifica se os models possuem o método associate, se tiver executa passando o array de models
Object.keys(models).forEach(model => {
    if(model.associate) model.associate(models);
})