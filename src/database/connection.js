import Sequelize from "sequelize";
import dbConfig from "../config/database";

// Importa todos os models da bd
import UserType from "../models/UserType";
import User from "../models/User";

const connection = new Sequelize(dbConfig); // Instância a conn. com a db

// Guarda todos os models da bd
const models = [UserType, User];
models.forEach(model => model.init(connection)); // Inicia os models com a conexão com o banco
models.forEach(model => model.associate && model.associate(connection.models)) // Verifica os models que possuem o método associate e executa passando o array de models