import {Router} from "express";
import patientController from '../controllers/Patients';
import auth from "../middlewares/auth";
import getHandler from "../middlewares/getHandler";
import recepcionista from "../middlewares/recepcionista"; // Importa o objecto controller de User
const router = new Router;

// router.get('/', auth, admin, getHandler, patientController.index);
// router.get('/:id', auth, admin, patientController.show);
router.post('/create', auth, recepcionista, patientController.create);
// router.put('/:id', auth, admin, patientController.put);
export default router; // Exporta o router