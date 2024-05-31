import { Router } from 'express';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import { listarMapeos} from '../controllers/mapeoController.js';
const router = Router();


// Ruta para listar los mapeos
router.get('/mapeos', checkRoleAuth(['Administrador', 'Registrador']), listarMapeos);

export default router;
