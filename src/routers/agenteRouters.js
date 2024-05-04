import { Router } from 'express';
import { registrarAgente, detalleAgente, actualizarAgente, eliminarAgente,listarAgentes} from '../controllers/agentesController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/agente', checkRoleAuth(['Administrador', 'Regristrador']),  registrarAgente);

// Ruta para ver el detalle de un usuario
router.get('/detalle/agente', checkRoleAuth(['Administrador', 'Regristrador']),  detalleAgente );

// Ruta para actualizar un usuario
router.put('/actualizar/agente', checkRoleAuth(['Administrador', 'Regristrador']),  actualizarAgente );

// Ruta para eliminar un usuario
router.delete('/eliminar/agente', checkRoleAuth(['Administrador', 'Regristrador']), eliminarAgente);

// Ruta para listar los usuarios
router.get('/agentes', checkRoleAuth(['Administrador', 'Regristrador']),  listarAgentes);

export default router;
