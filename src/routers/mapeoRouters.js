import { Router } from 'express';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import { listarMapeos,detalleMapeo, eliminarTodosLosMapeos} from '../controllers/mapeoController.js';
const router = Router();


// Ruta para listar los mapeos
router.get('/mapeos', checkRoleAuth(['Administrador']), listarMapeos);
router.get('/detalle/mapeo/:id', checkRoleAuth(['Administrador']), detalleMapeo);
router.delete('/eliminar-mapeos', eliminarTodosLosMapeos);


export default router;
