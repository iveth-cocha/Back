import { Router } from 'express';
import { registrarAgente, detalleAgente, actualizarAgente, eliminarAgente,listarAgentes} from '../controllers/agentesController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import {RegistroAGV, ActualizarAGV} from '../validation/agentesvalidacion.js'

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/agente', checkRoleAuth(['Administrador', 'Registrador']), RegistroAGV, registrarAgente);

// Ruta para ver el detalle de un usuario
router.get('/detalle/agente/:cedula', checkRoleAuth(['Administrador', 'Registrador']),  detalleAgente );

// Definición de la ruta para actualizar un agente por su cédula
router.put('/actualizar/agente/:cedula', checkRoleAuth(['Administrador', 'Registrador']), ActualizarAGV, actualizarAgente);

// Ruta para eliminar un usuario
router.delete('/eliminar/agente/:cedula', checkRoleAuth(['Administrador', 'Registrador']), eliminarAgente);

// Ruta para listar los usuarios
router.get('/agentes', checkRoleAuth(['Administrador', 'Registrador']),  listarAgentes);

export default router;
