import {Router} from "express";
import userController from '../controllers/Users'; // Importa o objecto controller de User
const router = new Router; // Cria o router

// Rotas
// UserTypes
router.get('/create', userController.post); // create

export default router; // Exporta o router