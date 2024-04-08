import { Router } from 'express';
import { registrarDelito,detalleDelito, actualizarDelito, eliminarDelito, listarDelitos} from '../controllers/delitosController.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/delegacion', registrarDelito);

// Ruta para ver el detalle de un usuario
router.get('/detalle/delegacion/:id', detalleDelito );

// Ruta para actualizar un usuario
router.put('/actualizar/delegacion/:id', actualizarDelito );

// Ruta para eliminar un usuario
router.delete('/eliminar/delegacion/:id',eliminarDelito);

// Ruta para listar los usuarios
router.get('/delegaciones', listarDelitos);



export default router;
