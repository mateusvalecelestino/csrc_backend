import {Router} from "express";
import userController from '../controllers/Users';
import auth from "../middlewares/auth"; // Importa o objecto controller de User
const router = new Router;

router.get('/', auth, userController.index);
router.get('/:id', auth, userController.show);
router.post('/create', auth, userController.create);
router.put('/:id', auth, userController.put);
router.delete('/:id', auth, userController.delete);


export default router; // Exporta o router