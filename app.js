import express from 'express';
import bodyParser from 'express';
import cors from 'cors';
import './src/database/connection'; // Importa a conexão com|para os models
import userTypes from './src/routes/userTypes';
import users from './src/routes/users';
import tokens from './src/routes/tokens';
import roles from './src/routes/roles';
import specialities from './src/routes/specialities';
import employees from './src/routes/employees';
import patients from './src/routes/patients';

// Lista de endereços permitidos
const allowedOrigins = ['http://localhost:3000'];

// Config. do cors
const corsOptions = {
    origin: allowedOrigins, // Permitir acesso apenas de endereços permitidos
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Permitir apenas estes métodos HTTP
};

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json()); // Middleware para analisar o corpo das solicitações
        this.app.use(bodyParser.urlencoded({ extended: true })); // Habilita a recepção de params na url
    }

    routes() {
        this.app.use('/tokens', tokens); // rota para gerir tokens
        this.app.use('/user-types', userTypes); // rota para gerir tipos de usuários
        this.app.use('/users', users); // rota para gerir usuários
        this.app.use('/roles', roles); // rota para gerir cargos
        this.app.use('/specialities', specialities); // rota para gerir especialidades
        this.app.use('/employees', employees); // rota para gerir employees
        this.app.use('/patients', patients); // rota para gerir pacientes
    }
}

export default new App().app; // Exporta o objecto da classe App
