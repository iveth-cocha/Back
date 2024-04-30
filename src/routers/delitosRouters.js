import { Router } from 'express';
import { registrarDelito,detalleDelito, actualizarDelito, eliminarDelito, listarDelitos, listarLocalizaciones} from '../controllers/delitosController.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/registro/delito', registrarDelito);

// Ruta para ver el detalle de un usuario
router.get('/detalle/delito', detalleDelito );

// Ruta para actualizar un usuario
router.put('/actualizar/delito', actualizarDelito );

// Ruta para eliminar un usuario
router.delete('/eliminar/delito',eliminarDelito);

// Ruta para listar los usuarios
router.get('/delitos', listarDelitos);

// Ruta para listar las localizaciones
router.get('/localizaciones', listarLocalizaciones);


export default router;
