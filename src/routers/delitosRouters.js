import { Router } from 'express';
import { registrarDelito,detalleDelito, actualizarDelito, eliminarDelito, listarDelitos, listarLocalizaciones} from '../controllers/delitosController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/delito', checkRoleAuth(['Regristrador']),  registrarDelito);

// Ruta para ver el detalle de un usuario
router.get('/detalle/delito', checkRoleAuth(['Regristrador']),   detalleDelito );

// Ruta para actualizar un usuario
router.put('/actualizar/delito', checkRoleAuth(['Regristrador']),   actualizarDelito );

// Ruta para eliminar un usuario
router.delete('/eliminar/delito', checkRoleAuth(['Regristrador']),  eliminarDelito);

// Ruta para listar los usuarios
router.get('/delitos', checkRoleAuth(['Regristrador']), listarDelitos);

// Ruta para listar las localizaciones
router.get('/localizaciones', checkRoleAuth(['Administrador', 'Regristrador']), listarLocalizaciones);


export default router;
