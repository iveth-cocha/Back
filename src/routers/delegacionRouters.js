import { Router } from 'express';
import { registrarDelegacion,detalleDelegacion, actualizarDelegacion, eliminarDelegacion, listarDelegaciones} from '../controllers/delegacionController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import {ActualizacionDV} from '../validation/delegacionesvalidacion.js'


const router = Router();

// Ruta para crear una nueva delegacion:
router.post('/registro/delegacion', checkRoleAuth(['Administrador', 'Registrador']), registrarDelegacion);

// Ruta para ver el detalle de una nueva delegacion:
router.get('/detalle/delegacion/:id', checkRoleAuth(['Administrador', 'Visualizador', 'Registrador']),  detalleDelegacion );

// Ruta para actualizar una nueva delegacion:
router.put('/actualizar/delegacion/:id', checkRoleAuth(['Administrador', 'Registrador']), ActualizacionDV, actualizarDelegacion );

// Ruta para eliminar una nueva delegacion:
router.delete('/eliminar/delegacion/:id', checkRoleAuth(['Administrador']), eliminarDelegacion);

// Ruta para listar las delegaciones:
router.get('/delegaciones', checkRoleAuth(['Administrador', 'Visualizador', 'Registrador']),  listarDelegaciones);

export default router;
