// usuarioRoutes.js
import { Router } from 'express';
import { login,solicitudRegistro, registro, detalleUsuario, perfil, actualizarUsuario, eliminarUsuario, listarUsuarios, confirmEmail, recuperarPassword, comprobarTokenPasword, nuevoPassword, actualizarContraseña} from '../controllers/usuarioController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'

//Crear rutas para cada perfil
const router = Router();

// Ruta para logear un usuario
router.post('/login', login);

// Ruta para solicitar un registro sin rol 
router.post('/solicitar-registro', solicitudRegistro);

// Ruta para crear un nuevo usuario
router.post('/registro', checkRoleAuth(['Administrador']), registro);

// Ruta para ver el detalle de un usuario
router.get('/detalle/usuario/:id', checkRoleAuth(['Administrador']), detalleUsuario );

router.get('/perfil',checkRoleAuth(['Administrador, Regristrador, Visualizador']), perfil);

// Ruta para actualizar un usuario
router.put('/actualizar/usuario/:id', checkRoleAuth(['Administrador']), actualizarUsuario );

// Ruta para eliminar un usuario
router.delete('/eliminar/usuario/:id', checkRoleAuth(['Administrador']), eliminarUsuario);

// Ruta para listar los usuarios
router.get('/usuarios', checkRoleAuth(['Administrador']), listarUsuarios);

// Ruta para confirmar email de un usuario
router.get('/confirmar/:token', confirmEmail);

// Ruta para recuperar el passowrd de un usuario
router.get('/recuperar-password', recuperarPassword);

// Ruta para verificar el token de un usuario
router.get('/recuperar-password/:token', comprobarTokenPasword);

// Ruta para crear un nuevo password de un usuario
router.post('/nuevo-password/:token', nuevoPassword);

// Ruta par actualizar obligatoriamente el password de un usuario
router.put('/actualizar-contrasena/:id', actualizarContraseña);

export default router;
