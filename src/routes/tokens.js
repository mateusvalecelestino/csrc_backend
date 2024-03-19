import {Router} from "express";
import tokenController from '../controllers/Tokens'; // Importa o objecto controller de UserTypes
const router = new Router; // Cria o router

// Rotas
router.post('/', tokenController.create); // generate

export default router; // Exporta o router