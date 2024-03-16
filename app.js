import express from 'express';
require('dotenv').config(); // Importa o dotenv
import './src/database/connection'; // Importa a conexão com|para os models
import userTypes from "./src/routes/userTypes";

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // noinspection JSCheckFunctionSignatures
        this.app.use(express.urlencoded({extended: true})); // Habilita a recepção de params na url
        // noinspection JSCheckFunctionSignatures
        this.app.use(express.json()); // habilita o uso de json
    }

    routes(){
        this.app.use('/user-types', userTypes); // rota para gerir tipos de usuários
    }
}

export default new App().app; // Exporta o objecto da classe App
