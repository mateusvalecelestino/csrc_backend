import {Router} from "express";
import userController from '../controllers/Users'; // Importa o objecto controller de User
const router = new Router; // Cria o router

// Rotas
// UserTypes
router.get('/', userController.get); // create
router.post('/create', userController.post); // create

export default router; // Exporta o router