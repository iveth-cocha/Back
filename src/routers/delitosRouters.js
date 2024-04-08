import { Router } from 'express';
import { registrarDelito,detalleDelito, actualizarDelito, eliminarDelito, listarDelitos} from '../controllers/delitosController.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/delito', registrarDelito);

// Ruta para ver el detalle de un usuario
router.get('/detalle/delito/:id', detalleDelito );

// Ruta para actualizar un usuario
router.put('/actualizar/delito/:id', actualizarDelito );

// Ruta para eliminar un usuario
router.delete('/eliminar/delito/:id',eliminarDelito);

// Ruta para listar los usuarios
router.get('/delitos', listarDelitos);



export default router;
