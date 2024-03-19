import {Router} from "express";
import userController from '../controllers/Users';
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import updateUser from "../middlewares/updateUser";
import getHandler from "../middlewares/getHandler"; // Importa o objecto controller de User
const router = new Router;

router.get('/', auth, admin, getHandler, userController.index);
router.get('/:id', auth, admin, userController.show);
router.post('/create', auth, admin, userController.create);
router.put('/:id', auth, updateUser, userController.put);
router.patch('/:id/active', auth, admin, userController.patch);
export default router; // Exporta o router