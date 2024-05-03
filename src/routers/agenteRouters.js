import { Router } from 'express';
import { registrarAgente, detalleAgente, actualizarAgente, eliminarAgente,listarAgentes} from '../controllers/agentesController.js';
import {verificarAdmin, verificarRegistrador, verificarVisualizador} from '../middlewares/autenticacion.js'

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/agente', registrarAgente);

// Ruta para ver el detalle de un usuario
router.get('/detalle/agente', detalleAgente );

// Ruta para actualizar un usuario
router.put('/actualizar/agente', actualizarAgente );

// Ruta para eliminar un usuario
router.delete('/eliminar/agente',eliminarAgente);

// Ruta para listar los usuarios
router.get('/agentes', listarAgentes);

export default router;
