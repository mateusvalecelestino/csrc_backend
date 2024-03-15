import {Router} from "express";
import userTypesController from '../controllers/UserTypes'; // Importa o objecto controller de UserTypes
const router = new Router; // Cria o router

// Rotas
// UserTypes
router.get('/', userTypesController.get); // getAll | get

export default router; // Exporta o router