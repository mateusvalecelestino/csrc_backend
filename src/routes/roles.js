import {Router} from "express";
import roleController from '../controllers/Roles';
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import getHandler from "../middlewares/getHandler";
const router = new Router;

router.get('/', auth, admin, getHandler, roleController.index);
router.get('/:id', auth, admin, roleController.show);
router.post('/create', auth, admin, roleController.create);
router.put('/:id', auth, admin, roleController.put);
export default router; // Exporta o router