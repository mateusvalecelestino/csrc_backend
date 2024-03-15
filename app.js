import express from 'express';
import userTypes from "./src/routes/userTypes";

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: true})); // Habilita a recepção de params na url
        this.app.use(express.json()); // habilita o uso de json
    }

    routes(){
        this.app.use('/user-types', userTypes); // rota para gerir tipos de usuários
    }
}

export default new App().app; // Exporta o objecto da classe App
