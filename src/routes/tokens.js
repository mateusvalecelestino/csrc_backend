import {Router} from "express";
import tokensController from '../controllers/Tokens'; // Importa o objecto controller de UserTypes
const router = new Router; // Cria o router

// Rotas
router.post('/', tokensController.create); // generate

export default router; // Exporta o router