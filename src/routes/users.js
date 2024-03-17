import {Router} from "express";
import userController from '../controllers/Users'; // Importa o objecto controller de User
const router = new Router;

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/create', userController.create);
router.put('/:id', userController.put);

export default router; // Exporta o router