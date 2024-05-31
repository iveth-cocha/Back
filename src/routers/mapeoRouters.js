import { Router } from 'express';
import { listarMapeos} from '../controllers/mapeoController.js';
const router = Router();


// Ruta para listar los mapeos
router.get('/mapeos',  listarMapeos);

export default router;
