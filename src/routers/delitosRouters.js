import { Router } from 'express';
import { registrarDelito,detalleDelito, actualizarDelito, eliminarDelito, listarDelitos, listarLocalizaciones, listarFiscalias} from '../controllers/delitosController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/delito', checkRoleAuth(['Administrador','Registrador']),  registrarDelito);

// Ruta para ver el detalle de un usuario
router.get('/detalle/delito/:id', checkRoleAuth(['Administrador','Registrador']),   detalleDelito );

// Ruta para actualizar un usuario
router.put('/actualizar/delito/:id', checkRoleAuth(['Administrador','Registrador']),   actualizarDelito );

// Ruta para eliminar un usuario
router.delete('/eliminar/delito/:id', checkRoleAuth(['Administrador','Registrador']),  eliminarDelito);

// Ruta para listar los usuarios
router.get('/delitos', checkRoleAuth(['Administrador','Registrador']), listarDelitos);

// Ruta para listar las localizaciones
router.get('/localizaciones', listarLocalizaciones);

// Ruta para listar las fiscalias
router.get('/fiscalias', checkRoleAuth(['Administrador', 'Registrador']), listarFiscalias);



export default router;
