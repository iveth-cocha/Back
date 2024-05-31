import { Router } from 'express';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import { listarMapeos,detalleMapeo} from '../controllers/mapeoController.js';
const router = Router();


// Ruta para listar los mapeos
router.get('/mapeos', checkRoleAuth(['Administrador']), listarMapeos);
router.get('/detalle/mapeo/:id', checkRoleAuth(['Administrador']), detalleMapeo);


export default router;
