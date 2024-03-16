import Sequelize from "sequelize";
import dbConfig from "../config/database";

// Importa todos os models da bd
import UserType from "../models/UserType";

// Guarda todos os models da bd
const models = [UserType];
const connection = new Sequelize(dbConfig); // Instância a conn. com a db
models.forEach(model => model.init(connection)); // insere a conn. em todos os models