import {Router} from "express";
import specialityController from '../controllers/specialties';
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import getHandler from "../middlewares/getHandler";

const router = new Router;

router.get('/', auth, admin, getHandler, specialityController.index);
router.get('/:id', auth, admin, specialityController.show);
router.post('/create', auth, admin, specialityController.create);
router.put('/:id', auth, admin, specialityController.put);
export default router; // Exporta o router