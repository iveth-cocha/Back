// usuarioRoutes.js
import { Router } from 'express';
import { login, registro, perfil, detalleUsuario, actualizarUsuario, eliminarUsuario, listarUsuarios, confirmEmail, recuperarPassword, comprobarTokenPasword, nuevoPassword, actualizarPassword} from '../controllers/usuarioController.js';

const router = Router();

// Ruta para logear un usuario
router.post('/login', login);

// Ruta para crear un nuevo usuario
router.post('/registro', registro);

// Ruta para ver el perfil de un usuario
router.get('/perfil', perfil);

// Ruta para ver el detalle de un usuario
router.get('/detalle/usuario/:id', detalleUsuario );

// Ruta para actualizar un usuario
router.put('/actualizar/usuario/:id', actualizarUsuario );

// Ruta para eliminar un usuario
router.delete('/eliminar/usuario/:id',eliminarUsuario);

// Ruta para listar los usuarios
router.get('/usuarios', listarUsuarios);

// Ruta para confirmar email de un usuario
router.get('/confirmar/:token', confirmEmail);

// Ruta para recuperar el passowrd de un usuario
router.get('/recuperar-password', recuperarPassword);

// Ruta para verificar el token de un usuario
router.get('/recuperar-password/:token', comprobarTokenPasword);

// Ruta para crear un nuevo password de un usuario
router.post('/nuevo-password/:token', nuevoPassword);

// Ruta para actualizar el password de un usuario
router.put('/usuario/actualizarpassword', actualizarPassword );

export default router;
