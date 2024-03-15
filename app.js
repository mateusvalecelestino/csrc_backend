import express from 'express';
class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: true})); // Para receber params na url
        this.app.use(express.json()); // habilita o uso de json
    }

    routes(){

    }
}

export default new App().app; // Exporta o objecto da classe App
