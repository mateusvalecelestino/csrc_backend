import {Router} from "express";
import employeeController from '../controllers/Employees';
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import getHandler from "../middlewares/getHandler"; // Importa o objecto controller de User
const router = new Router;

router.get('/', auth, admin, getHandler, employeeController.index);
router.get('/:id', auth, admin, employeeController.show);
// router.post('/create', auth, admin, employeeController.create);
router.put('/:id', auth, admin, employeeController.put);
// router.patch('/:id/active', auth, admin, employeeController.patch);
export default router; // Exporta o router