import {Router} from "express";
import userTypesController from '../controllers/UserTypes';
import auth from "../middlewares/auth"; // Importa o objecto controller de UserTypes
const router = new Router; // Cria o router

// Rotas
// UserTypes
router.get('/', auth , userTypesController.index); // getAll | index

export default router; // Exporta o router