// usuarioRoutes.js
import { Router } from 'express';
import { login,logout,solicitudRegistro, registro, detalleUsuario, perfil, actualizarUsuario, eliminarUsuario, listarUsuarios, confirmEmail, recuperarPassword, comprobarTokenPasword, nuevoPassword, actualizarContraseña} from '../controllers/usuarioController.js';
import {checkRoleAuth} from '../middlewares/autenticacion.js'
import {loginVU, solicitudRegistroVU, contraseñaVU, passwordCorreoRVU, contraseñaNuevaVU} from '../validation/usuariosvalidacion.js'

//Crear rutas para cada perfil
const router = Router();

// Ruta para logear un usuario
router.post('/login', loginVU, login); 

// Ruta para logear un usuario
router.post('/logout/:tokenSession', logout);

// Ruta para solicitar un registro sin rol 
router.post('/solicitar-registro', solicitudRegistroVU, solicitudRegistro);

// Ruta para crear un nuevo usuario
router.post('/registro',checkRoleAuth(['Administrador']), registro);

// Ruta para ver el detalle de un usuario
router.get('/detalle/usuario/:id', checkRoleAuth(['Administrador', 'Registrador']), detalleUsuario );

// Ruta para ver el perfil de un usuario
router.get('/perfil',checkRoleAuth(['Administrador', 'Registrador', 'Visualizador']), perfil);

// Ruta para actualizar un usuario
router.put('/actualizar/usuario/:id', checkRoleAuth(['Administrador']), actualizarUsuario );

// Ruta para eliminar un usuario
router.delete('/eliminar/usuario/:id', checkRoleAuth(['Administrador']), eliminarUsuario);

// Ruta para listar los usuarios
router.get('/usuarios', checkRoleAuth(['Administrador']),  listarUsuarios);

// Ruta para confirmar email de un usuario
router.get('/confirmar/:token', confirmEmail);

// Ruta para recuperar el passowrd de un usuario
router.post('/recuperar-password',passwordCorreoRVU, recuperarPassword);

// Ruta para verificar el token de un usuario
router.get('/recuperar-password/:token', comprobarTokenPasword);

// Ruta para crear un nuevo password de un usuario
router.post('/nuevo-password/:token', contraseñaNuevaVU, nuevoPassword);

// Ruta par actualizar obligatoriamente el password de un usuario
router.put('/actualizar-contrasena/:token', contraseñaVU, actualizarContraseña);

export default router;
