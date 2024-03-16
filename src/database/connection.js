import Sequelize from "sequelize";
import dbConfig from "../config/database";

// Importa todos os models da bd
import UserType from "../models/UserType";
import User from "../models/User";

const connection = new Sequelize(dbConfig); // Instância a conn. com a db

// Guarda todos os models da bd
const models = {
    UserType, User
};

// Insere a conexão nos models
Object.keys(models).forEach(model => {
    models[model].init(connection)
})

// Verifica se um model possui associação e cria, caso possua
Object.keys(models).forEach(model => {
    if (models[model].associate) {
        models[model].associate(models)
    }
})