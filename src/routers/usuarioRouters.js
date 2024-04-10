// usuarioRoutes.js
import { Router } from 'express';
import { login,solicitudRegistro, registro, detalleUsuario, actualizarUsuario, eliminarUsuario, listarUsuarios, confirmEmail, recuperarPassword, comprobarTokenPasword, nuevoPassword} from '../controllers/usuarioController.js';
import {verificarAdmin, verificarRegistrador, verificarVisualizador} from '../middlewares/autenticacion.js'

//Crear rutas para cada perfil
const router = Router();

// Ruta para logear un usuario
router.post('/login', login);

// Ruta para solicitar un registro
router.post('/solicitar-registro', solicitudRegistro);

// Ruta para crear un nuevo usuario
router.post('/registro', registro);

// Ruta para ver el detalle de un usuario
router.get('/detalle/usuario/:id',verificarAdmin, detalleUsuario );

// Ruta para actualizar un usuario
router.put('/actualizar/usuario/:id', verificarAdmin, actualizarUsuario );

// Ruta para eliminar un usuario
router.delete('/eliminar/usuario/:id',verificarAdmin,eliminarUsuario);

// Ruta para listar los usuarios
router.get('/usuarios', verificarAdmin, listarUsuarios);

// Ruta para confirmar email de un usuario
router.get('/confirmar/:token', confirmEmail);

// Ruta para recuperar el passowrd de un usuario
router.get('/recuperar-password', recuperarPassword);

// Ruta para verificar el token de un usuario
router.get('/recuperar-password/:token', comprobarTokenPasword);

// Ruta para crear un nuevo password de un usuario
router.post('/nuevo-password/:token', nuevoPassword);

export default router;
