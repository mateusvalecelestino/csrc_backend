import { Router } from 'express';
import patientController from '../controllers/Patients';
import auth from '../middlewares/auth';
import getHandler from '../middlewares/getHandler';
import recepcionista from '../middlewares/recepcionista'; // Importa o objecto controller de User
const router = new Router();

router.get('/', auth, recepcionista, getHandler, patientController.index);
router.get('/:id', auth, recepcionista, patientController.show);
router.post('/create', auth, recepcionista, patientController.create);
router.put('/:id', auth, recepcionista, patientController.put);
router.delete('/:id', auth, recepcionista, patientController.delete);

export default router; // Exporta o router
