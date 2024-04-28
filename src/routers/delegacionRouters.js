import { Router } from 'express';
import { registrarDelegacion,detalleDelegacion, actualizarDelegacion, eliminarDelegacion, listarDelegaciones} from '../controllers/delegacionController.js';

const router = Router();

// Ruta para crear un nuevo usuario:
router.post('/registro/delegacion', registrarDelegacion);

// Ruta para ver el detalle de un usuario _
router.get('/detalle/delegacion', detalleDelegacion );

// Ruta para actualizar un usuario:
router.put('/actualizar/delegacion', actualizarDelegacion );

// Ruta para eliminar un usuario:
router.delete('/eliminar/delegacion',eliminarDelegacion);

// Ruta para listar los usuarios:
router.get('/delegaciones', listarDelegaciones);

export default router;
