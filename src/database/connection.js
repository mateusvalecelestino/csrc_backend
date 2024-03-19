import Sequelize from "sequelize";
import dbConfig from "../config/database";
import UserType from "../models/UserType";
import User from "../models/User";
import Role from "../models/Role";

const connection = new Sequelize(dbConfig); // Instância a conn. com a db

// Guarda todos os models da bd
const models = [UserType, User, Role];

// Inicia os models com a conexão com o banco e adiciona o hook global
models.forEach(model => {
    // Adiciona a conexão a todos os models
    model.init(connection);

    // Adicione um hook global 'beforeSave' para todos os modelos
    connection.addHook('beforeSave', "trimAllValues" , (instance) => {
        // Verifica se a instância é do model actual
        if (instance instanceof model) {
            // Realiza o trim dos dados de string antes de salvar
            Object.keys(instance.dataValues).forEach(key => {
                // Verifica se o valor do atributo é uma string
                if (typeof instance[key] === 'string') {
                    // Remove espaços extras entre as palavras
                    instance[key] = instance[key].replace(/\s+/g, ' ').trim();
                }
            });
        }
    });
});

// Verifica os models que possuem o método associate e executa passando o array de models
models.forEach(model => model.associate && model.associate(connection.models))