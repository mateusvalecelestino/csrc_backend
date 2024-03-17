import {Router} from "express";
import userController from '../controllers/Users';
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import updateUser from "../middlewares/updateUser"; // Importa o objecto controller de User
const router = new Router;

router.get('/', auth, admin, userController.index);
router.get('/:id', auth, admin, userController.show);
router.post('/create', auth, admin, userController.create);
router.put('/:id', auth, updateUser, userController.put);
export default router; // Exporta o router