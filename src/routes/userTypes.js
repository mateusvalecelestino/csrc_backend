import {Router} from "express";
import userTypesController from '../controllers/UserTypes';
import auth from "../middlewares/auth";
import admin from "../middlewares/admin"; // Importa o objecto controller de UserTypes
const router = new Router; // Cria o router

// Rotas
// UserTypes
router.get('/', auth, admin, userTypesController.index); // getAll | index

export default router; // Exporta o router