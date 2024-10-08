import { encrypPassword, matchPassword, crearToken, crearTokenSession } from '../middlewares/bcrypt.js';
import { sendMailToUser, sendMailToResetPassword, sendMailToAdmin } from '../config/nodemailer.js';
import { generarJWT, VDToken } from "../helpers/crearJWT.js"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Login de un usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
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
      return res.status(404).json({ msg: "Lo sentimos, el correo electrónico no se encuentra registrado." });
    }

    // Verificar si el correo electrónico del usuario está confirmado
    if (usuarioBDD.confirmEmail === false) {
      return res.status(403).json({ msg: "Lo sentimos, debe verificar su cuenta." });
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const verificarPassword = await matchPassword(password, usuarioBDD.password);
    if (!verificarPassword) {
      return res.status(404).json({ msg: "Lo sentimos, la contraseña no es correcta" });
    }

    // Obtener fecha y hora actual
    const fechaHoraInicioTimestamp = Date.now(); // Get timestamp in milliseconds
    const fechaHoraInicioDate = new Date(fechaHoraInicioTimestamp); // Create Date object
    const opcionesFormato = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'America/Guayaquil'
    };

    const fechaHoraFormateada = fechaHoraInicioDate.toLocaleString('es-EC', opcionesFormato); // Formatear fecha y hora

    // Crear un nuevo registro en la tabla Mapeo con los datos del usuario y la hora de entrada
    const tokenSession = crearTokenSession();

    await prisma.$transaction([
      prisma.mapeo.create({
        data: {
          agente: {
            connect: {
              Cedula: usuarioBDD.agenteID
            }
          },
          usuario: {
            connect: {
              id: usuarioBDD.id
            }
          },
          tokenSession: tokenSession,
          hora_entrada: fechaHoraFormateada,
          cedula: usuarioBDD.agente.Cedula,
          nombreAgente: usuarioBDD.agente.Apellido_Nombre,
          grado: usuarioBDD.agente.Grado,
          Rol: usuarioBDD.Rol,
          accionRealizada: "Ingreso"
        }
      }),
      prisma.usuario.update({
        where: {
          id: usuarioBDD.id
        },
        data: {
          tokenSession: tokenSession
        }
      })
    ]);

    const token = generarJWT(usuarioBDD.id, usuarioBDD.Rol)

    // Extraer los campos necesarios del usuario para la respuesta
    const { nombre, Rol, agenteID, agente, id} = usuarioBDD;
    const grado = agente.Grado; // Suponiendo que "grado" es un campo en la tabla Agente
    // Enviar una respuesta exitosa con los detalles del usuario
    res.status(200).json({
      token,
      tokenSession,
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

// Registro un nuevo usuario
export const registro = async (req, res) => {

  const { agenteID, nombre, email, Rol } = req.body;

  try {
    const ultimoOrden = await prisma.usuario.findFirst({
      select: {
        Orden: true,
      },
      orderBy: {
        Orden: 'desc'
      }
    });

    let nuevoOrden = 1;

    if (ultimoOrden) {
      nuevoOrden = ultimoOrden.Orden + 1;
    }

    // Verificar si la cedula está registrada en la base de datos y pertenece a algún agente
    const agenteExistente = await prisma.agente.findUnique({
      where: {
        Cedula: agenteID.toString()
      }
    });

    if (!agenteExistente) {
      return res.status(400).json({ msg: "El agente con la cédula proporcionada no existe o el nombre del agente no se encuentra registrado" });
    }

    // Verificar si todos los campos están llenos
    if (!nombre || !email || !agenteID) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos." });
    }

    // Verificar si el rol seleccionado es válido
    if (!Rol) {
      return res.status(400).json({ msg: "Por favor selecione un rol" });
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

    // Verificar si el agente ya tiene un usuario registrado
    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        agenteID: agenteExistente.Cedula
      }
    });

    if (usuarioExistente) {
      return res.status(400).json({ msg: "El agente ya tiene un usuario registrado" });
    }

    const password = `${agenteExistente.Cedula}_Cib3rp0l**Ññ`;

    // Encriptar el password
    const passwordEncrypted = await encrypPassword(password);

    // Crea el token para el nuevo usuario
    const token = crearToken();

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        Orden: nuevoOrden,
        nombre: nombre,
        email: email,
        password: passwordEncrypted,
        Rol: Rol,
        agente: {
          connect: { Cedula: agenteID }
        },
        Grado: agenteExistente.Grado,
        token: token,
      },
    });

    // Enviar correo electrónico de confirmación
    await sendMailToUser(email, token);

    return res.status(200).json({ msg: "El registro del usuario se ha completado con éxito. Por favor, pídale que verifique su correo electrónico para proceder con el siguiente paso." });
  } catch (error) {
    console.error("Error al crear el nuevo usuario:", error);
    res.status(500).json({ msg: "Ocurrió un error al crear el nuevo usuario" });
  }
};

// Solicitud para el registro un nuevo usuario
export const solicitudRegistro = async (req, res) => {
  const { cedula, nombre, email, mensaje } = req.body;
  try {
    // Envía un correo electrónico al administrador para notificar la solicitud de registro
    await sendMailToAdmin(cedula, email, nombre, mensaje);

    // Envía una respuesta de éxito al cliente
    res.status(200).json({ msg: "Tu solicitud de registro ha sido enviada correctamente. Espera la respuesta por parte del administrador." });
  } catch (error) {
    console.error("Error al procesar la solicitud de registro:", error);
    res.status(500).json({ msg: "Ocurrió un error al procesar la solicitud de registro" });
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
        agenteID: true,
        agente: {
          select: {
            Cedula: true,
            Grado: true,
          }
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: `Lo sentimos, no se encontró el usuario con id ${id}` });
    }

    res.status(200).json({ msg: usuario });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ msg: 'Ocurrió un error al buscar el usuario' });
  }
};

// Perfil de un usuario
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
  const datosActualizadosUsuario = req.body;

  try {

    // Verificar si el correo proporcionado ya está en uso por otro usuario
    const correoExistente = await prisma.usuario.findFirst({
      where: {
        email: datosActualizadosUsuario.email,
        NOT: {
          id: parseInt(id) // Excluir al usuario actual de la búsqueda
        }
      }
    });  //Se elimino la validacion de email por redundancia 

    // Busca al usuario por su id
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // Verificar si se encontró al usuario
    if (!usuario) {
      return res.status(404).json({ msg: `Lo sentimos, no se encontró el usuario con id ${id}` });
    }

    // Actualizar el perfil del usuario
    await prisma.usuario.update({
      where: {
        id: parseInt(id),
      },
      data: datosActualizadosUsuario // Actualizar con los datos proporcionados en el cuerpo de la solicitud
    });

    res.status(200).json({ msg: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ msg: 'Ocurrió un error al actualizar el perfil' });
  }
};

// Método para reordenar los usuarios después de eliminar uno (OJO)
const reordenarUsuarios = async () => {
  const usuarios = await prisma.usuario.findMany();
  usuarios.sort((a, b) => a.Orden - b.Orden); // Ordenar los usuarios por el campo Orden

  // Actualizar el campo Orden en secuencia
  for (let i = 0; i < usuarios.length; i++) {
      await prisma.usuario.update({
          where: { id: usuarios[i].id },
          data: { Orden: i + 1 } // Incrementar el orden en 1
      });
  }
};
// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Encontrar el usuario
    const usuarioEliminado = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!usuarioEliminado) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Desasociar todos los mapeos relacionados con el usuario
    await prisma.mapeo.updateMany({
      where: {
        usuarioId: parseInt(id),
      },
      data: {
        usuarioId: null,
      },
    });

    // Eliminar el usuario
    await prisma.usuario.delete({
      where: {
        id: parseInt(id),
      },
    });

    // Llamada a reordenarUsuarios si es necesario
    await reordenarUsuarios();

    res.status(200).json({ msg: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
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

    // Verificar si el email ya ha sido confirmado
    if (usuarioBDD.confirmEmail) {
      return res.status(400).json({ msg: "El correo electrónico ya ha sido confirmado" });
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

    res.status(200).json({ msg: "Cuenta confirmana, es necesario que cree una contraseña" });
  } catch (error) {
    console.error("Error al confirmar el email del usuario:", error);
    res.status(500).json({ msg: "Ocurrió un error al confirmar el email del usuario" });
  }
};

// Recuperar password de un usuario
export const recuperarPassword = async (req, res) => {
  const { email } = req.body;

  try {
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

    // Generar un token y lo asigna al usuario
    const token = crearToken();
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

    res.status(200).json({ msg: "Correo electrónico confirmado, ya puedes crear tu nueva contraseña" });
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

// Método para actualizar la contraseña del usuario y redirigirlo después de confirmar la cuenta
export const actualizarContraseña = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }

    // Buscar al usuario por su token en la base de datos
    const usuario = await prisma.usuario.findFirst({
      where: {
        token: token.toString()
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: `Lo sentimos, no se encontró el usuario con el token ${token}` });
    }

    // Encriptar la nueva contraseña
    const newPasswordEncrypted = await encrypPassword(newPassword);

    // Actualizar la contraseña del usuario en la base de datos
    await prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        password: newPasswordEncrypted,
      },
    });

    res.status(200).json({ msg: "Contraseña creada correctamente" });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ msg: 'Ocurrió un error al actualizar la contraseña' });
  }
};

//Cerrar sesion usuario
export const logout = async (req, res) => {
  try {
    // Verificar si el token está presente en los parámetros de la solicitud
    const tokenSession = req.params.tokenSession;
    if (!tokenSession) {
      return res.status(400).json({ msg: "Lo sentimos, token session invalido" });
    }

    // Buscar el mapeo por el token en la base de datos
    const mapeoBDD = await prisma.mapeo.findFirst({
      where: {
        tokenSession: tokenSession,
      },
      include: {
        usuario: true // Incluir los datos del usuario relacionado
      }
    });

    // Verificar si el mapeo no existe o si su token es nulo
    if (!mapeoBDD || !mapeoBDD.tokenSession) {
      return res.status(404).json({ msg: "El token de session no existe" });
    }

    // Obtener la fecha y hora actual
    const fechaHoraSalidaTimestamp = Date.now();
    const fechaHoraSalidaDate = new Date(fechaHoraSalidaTimestamp);
    const opcionesFormato = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "America/Guayaquil",
    };

    const fechaHoraFormateada = fechaHoraSalidaDate.toLocaleString("es-EC", opcionesFormato);

    // Actualizar la hora de salida y el tokenSession en las tablas Mapeo y Usuario
    await prisma.$transaction([
      prisma.mapeo.update({
        where: {
          tokenSession: tokenSession,
        },
        data: {
          hora_salida: fechaHoraFormateada,
          tokenSession: null, // Establecer tokenSession a null en la tabla Mapeo
        },
      }),
      prisma.usuario.update({
        where: {
          id: mapeoBDD.usuario.id
        },
        data: {
          tokenSession: null // Establecer tokenSession a null en la tabla Usuario
        }
      })
    ]);

    // Enviar una respuesta exitosa con los detalles del usuario
    res.status(200).json({
      msg: "Sesión cerrada con éxito",
      fechaHoraFormateada,
    });
  } catch (error) {
    // Si hay algún error, enviar una respuesta de error
    console.error("Error al cerrar la sesión del usuario:", error);
    res.status(500).json({ msg: "Error al cerrar la sesión del usuario" });
  }
};

