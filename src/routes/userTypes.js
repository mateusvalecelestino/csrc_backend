import {Router} from "express";
import UserTypesController from '../controllers/UserTypes'; // Importa o controller de userTypes
const router = new Router; // Cria o router

// Rotas
router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "api running | user-types route"
    })
})

export default router;