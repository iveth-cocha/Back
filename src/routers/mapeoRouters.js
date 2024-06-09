import { Router } from 'express';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import { listarMapeos, eliminarTodosLosMapeos} from '../controllers/mapeoController.js';
const router = Router();


// Ruta para listar los mapeos
router.get('/mapeos', checkRoleAuth(['Administrador']), listarMapeos);
router.delete('/eliminar-mapeos', checkRoleAuth(['Administrador']), eliminarTodosLosMapeos);


export default router;
