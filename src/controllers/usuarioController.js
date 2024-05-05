import { encrypPassword,matchPassword, crearToken } from '../middlewares/bcrypt.js';
import {sendMailToUser, sendMailToResetPassword, sendMailToAdmin}  from '../config/nodemailer.js'; 
import {generarJWT, VDToken} from "../helpers/crearJWT.js"


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Login de un usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Buscar al usuario por el correo electrónico en la base de datos
    const usuarioBDD = await prisma.usuario.findUnique({
      where: {
        email: email
      },
      include: {
        agente: true // Incluir los datos del agente relacionado
      }
    });

    // Verificar si el usuario existe
    if (!usuarioBDD) {
      return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
    }

    // Verificar si el correo electrónico del usuario está confirmado
    if (usuarioBDD.confirmEmail === false) {
      return res.status(403).json({ msg: "Lo sentimos, debe verificar su cuenta" });
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const verificarPassword = await matchPassword(password, usuarioBDD.password);
    if (!verificarPassword) {
      return res.status(404).json({ msg: "Lo sentimos, la contraseña no es correcta" });
    }

    // Verificar si es necesario actualizar la contraseña
    if (!usuarioBDD.actualizarPassword) {
      // Redirigir al usuario a una página para actualizar su contraseña
      return res.status(200).json({ msg: "Es necesario actualizar su contraseña", redirectTo: '/actualizar-contrasena' });
    }

    const token = generarJWT(usuarioBDD.id, usuarioBDD.Rol)

    // Extraer los campos necesarios del usuario para la respuesta
    const { nombre, Rol, agenteID, agente, id} = usuarioBDD;
    const grado = agente.Grado; // Suponiendo que "grado" es un campo en la tabla Agente
    // Enviar una respuesta exitosa con los detalles del usuario
    res.status(200).json({
      token,
      agenteID,
      grado,
      nombre,
      Rol,
      id
    });
  } catch (error) {
    // Si hay algún error, enviar una respuesta de error
    console.error('Error al logear el usuario:', error);
    res.status(500).json({ msg: "Error al logear el usuario" });
  }
};

// Solicitud para el registro un nuevo usuario
export const solicitudRegistro = async (req, res) => {
  const { cedula, nombre, email, mensaje } = req.body;
  try {
    // Verifica si todos los campos están llenos
    if (!cedula ||!nombre || !email || !mensaje ) {
      return res.status(400).json({ msg: "Debes llenar todos los campos" });
    }
    // Envía un correo electrónico al administrador para notificar la solicitud de registro
    await sendMailToAdmin(cedula, email, nombre, mensaje);

    // Envía una respuesta de éxito al cliente
    res.status(200).json({ msg: "Tu solicitud de registro ha sido enviada correctamente. Espera la confirmación del administrador." });
  } catch (error) {
    console.error("Error al procesar la solicitud de registro:", error);
    res.status(500).json({ msg: "Ocurrió un error al procesar la solicitud de registro" });
  }
};

// Registro un nuevo usuario
export const registro = async (req, res) => {
  const { agenteID, nombre, email, rol } = req.body;

  try {
    // Verificar si todos los campos están llenos
    if (!nombre || !email || !rol || !agenteID) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Verificar si el email ya está registrado
    const verificarEmailBDD = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });
    
    if (verificarEmailBDD) {
      return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    }

    // Verificar si el rol seleccionado es válido
    const rolesValidos = ['Administrador', 'Visualizador', 'Registrador'];
    if (!rolesValidos.includes(rol)) {
      return res.status(400).json({ msg: "Rol inválido" });
    }

    // Verificar si la cedula está registrada en la base de datos y pertenece a algún agente
    const agenteExistente = await prisma.agente.findUnique({
      where: {
        Cedula: agenteID.toString()
      }
    });
    if (!agenteExistente) {
      return res.status(400).json({ msg: "El agente con la cédula proporcionada no existe" });
    }

    // Verificar si el agente ya tiene un usuario registrado
    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        agenteID: agenteExistente.Cedula
      }
    });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "El agente ya tiene un usuario registrado" });
    }

    // Generar la contraseña con el ID del agente seguido de "_Cib3rp0l**"
    const password = `${agenteExistente.Cedula}_Cib3rp0l**`;

    // Encriptar el password
    const passwordEncrypted = await encrypPassword(password);

    // Crea el token para el nuevo usuario
    const token = crearToken();

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: nombre,
        email: email,
        password: passwordEncrypted,
        Rol: rol,
        agente: {
          connect: { Cedula: agenteID }
        },
        Grado: agenteExistente.Grado,
        token: token,
        actualizarPassword: false,
      },
    });

    // Enviar correo electrónico de confirmación
    await sendMailToUser(email, token);

    res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
  } catch (error) {
    console.error("Error al crear el nuevo usuario:", error);
    res.status(500).json({ msg: "Ocurrió un error al crear el nuevo usuario" });
  }
};

// Detalle de un usuario
export const detalleUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        Rol: true,
        agente: {
          select: {
            Cedula: true,
            Grado: true,
          }
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: `Lo sentimos, no se encontró el usuario con ID ${id}` });
    }

    res.status(200).json({ msg: usuario });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ msg: 'Ocurrió un error al buscar el usuario' });
  }
};

export const perfil = async (req, res) => {
  try {
    // Obtener el token de autorización del encabezado de la solicitud
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Se requiere una cabecera de autorización' });
    }

    // Extraer el token del encabezado de autorización
    const token = authorizationHeader.split(' ')[1];

    // Verificar y decodificar el token para obtener la información del usuario
    const tokenData = await VDToken(token);
    if (!tokenData || !tokenData.id) {
      return res.status(401).json({ error: 'Token de autorización no válido' });
    }

    // Buscar el perfil del usuario en la base de datos utilizando su ID obtenido del token
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: tokenData.id,
      }
    });

    // Verificar si se encontró el usuario en la base de datos
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver el perfil del usuario como respuesta
    return res.status(200).json({ usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ha ocurrido un error interno del servidor' });
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  try {
      // Verificar si el ID es válido
      const usuario = await prisma.usuario.findUnique({
          where: {
              id: parseInt(id),
          },
      });

      if (!usuario) {
          return res.status(404).json({ msg: `Lo sentimos, no se encontró el usuario con ID ${id}` });
      }

      // Verificar si el nuevo email ya está registrado
      if (email && email !== usuario.email) {
          const usuarioExistente = await prisma.usuario.findUnique({
              where: {
                  email,
              },
          });

          if (usuarioExistente) {
              return res.status(400).json({ msg: `Lo sentimos, el correo electrónico ya está registrado` });
          }
      }

      // Actualizar el perfil del usuario
      await prisma.usuario.update({
          where: {
              id: parseInt(id),
          },
          data: {
              nombre: nombre || usuario.nombre,
              email: email || usuario.email,
          },
      });

      res.status(200).json({ msg: "Perfil actualizado correctamente" });
  } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      res.status(500).json({ msg: 'Ocurrió un error al actualizar el perfil' });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {

  const { id } = req.params;

  try {

    if (!id) {
      return res.status(404).json({ msg: 'Se requiere proporcionar un id de un usuario' });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await prisma.usuario.delete({
      where: {
        id: Number(id),
      },
    });
    
    res.status(200).json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar un usuario:', error);
    res.status(500).send('Error al eliminar un usuario');
  }
};

// Lista de usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error, lista de usuarios:', error);
    res.status(500).send('Error, lista de usuarios');
  }
};

// Confirmar email de un usuario
export const confirmEmail = async (req, res) => {
  try {
    // Verificar si el token está presente en los parámetros de la solicitud
    if (!req.params.token) {
      return res.status(400).json({ msg: "Lo sentimos, no se puede validar la cuenta" });
    }

    // Buscar al usuario por el token en la base de datos
    const usuarioBDD = await prisma.usuario.findFirst({
      where: {
        token: req.params.token
      }
    });

    // Verificar si el usuario no existe o si su token es nulo
    if (!usuarioBDD?.token) {
      return res.status(404).json({ msg: "La cuenta ya ha sido confirmada" });
    }

    // Actualizar el token y establecer confirmEmail en true
    const updatedUsuario = await prisma.usuario.update({
      where: {
        id: usuarioBDD.id
      },
      data: {
        token: usuarioBDD.token,
        confirmEmail: true
      }
    });

    res.status(200).json({ msg: "Token confirmado, ya puedes iniciar sesión" });
  } catch (error) {
    console.error("Error al confirmar el email del usuario:", error);
    res.status(500).json({ msg: "Ocurrió un error al confirmar el email del usuario" });
  }
};

// Recuperar password de un usuario
export const recuperarPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si todos los campos están llenos
    if (!email) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Buscar al usuario por el correo electrónico en la base de datos
    const usuarioBDD = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    // Verificar si el usuario existe
    if (!usuarioBDD) {
      return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
    }

    // Generar un token y asignarlo al usuario
    const token = crearToken(); // Debes tener una función crearToken implementada
    await prisma.usuario.update({
      where: {
        email: email,
      },
      data: {
        token: token,
      },
    });

    // Enviar correo electrónico para recuperar la contraseña
    await sendMailToResetPassword(email, token);

    res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu contraseña" });
  } catch (error) {
    console.error("Error al recuperar la contraseña:", error);
    res.status(500).json({ msg: "Ocurrió un error al recuperar la contraseña" });
  }
};

// Comprobar token de password de un usuario
export const comprobarTokenPasword = async (req, res) => {
  try {
    const { token } = req.params;

    // Buscar al usuario por el token en la base de datos
    const usuarioBDD = await prisma.usuario.findFirst({
      where: {
        token: token,
      },
    });

    // Verificar si el usuario existe y el token es válido
    if (!usuarioBDD) {
      return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" });
    }

    res.status(200).json({ msg: "Token confirmado, ya puedes crear tu nueva contraseña" });
  } catch (error) {
    console.error("Error al confirmar el token de la contraseña:", error);
    res.status(500).json({ msg: "Ocurrió un error al confirmar el token de la contraseña" });
  }
};

// Nuevo password de un usuario
export const nuevoPassword = async (req, res) => {
  const { password, confirmpassword } = req.body;
  const { token } = req.params;

  try {
    // Verificar si se proporcionan todas las contraseñas
    if (!password || !confirmpassword) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmpassword) {
      return res.status(400).json({ msg: "Lo sentimos, las contraseñas no coinciden" });
    }

    // Buscar al usuario por el token en la base de datos
    const usuarioBDD = await prisma.usuario.findFirst({
      where: {
        token: token,
      },
    });

    // Verificar si el usuario existe y el token es válido
    if (!usuarioBDD) {
      return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" });
    }

    // Actualizar la contraseña del usuario en la base de datos
    await prisma.usuario.update({
      where: {
        id: usuarioBDD.id,
      },
      data: {
        password: await encrypPassword(password), // Cifrar la nueva contraseña
        token: null, // Limpiar el token
      },
    });

    res.status(200).json({ msg: "¡Felicitaciones! Ahora puedes iniciar sesión con tu nueva contraseña" });
  } catch (error) {
    console.error("Error al establecer el nuevo password:", error);
    res.status(500).json({ msg: "Ocurrió un error al establecer el nuevo password" });
  }
};

// Método para actualizar la contraseña del usuario
export const actualizarContraseña = async (req, res) => {
  const { id } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    // Verificar si la nueva contraseña coincide con la confirmación de contraseña
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }

    // Buscar al usuario por ID en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: `Lo sentimos, no se encontró el usuario con ID ${id}` });
    }

    // Encriptar la nueva contraseña
    const newPasswordEncrypted = await encrypPassword(newPassword);

    // Actualizar la contraseña del usuario en la base de datos
    await prisma.usuario.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: newPasswordEncrypted,
        actualizarPassword: true, // Establecer el campo passwordUpdated a true
      },
    });

    res.status(200).json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ msg: 'Ocurrió un error al actualizar la contraseña' });
  }
};



