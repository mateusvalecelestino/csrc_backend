import {Router} from "express";
import userController from '../controllers/Users'; // Importa o objecto controller de User
const router = new Router; // Cria o router

// Rotas
// UserTypes
router.get('/', userController.index); // getAll
router.get('/:id', userController.show) // getUser
router.post('/create', userController.create); // create

export default router; // Exporta o router