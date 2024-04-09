import { Password, encrypPassword,matchPassword, crearToken } from '../middlewares/bcrypt.js';
import {sendMailToUser, sendMailToRecoveryPassword }  from '../config/nodemailer.js'; 
import {generarJWT} from "../helpers/crearJWT.js"


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

// Registro un nuevo usuario
export const registro = async (req, res) => {
  const { agenteID, nombre, email, rol } = req.body;

  // Verificar si todos los campos están llenos
  if (!nombre || !email || !rol || !agenteID) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
  }
  
  try {
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
      const rolesValidos = ['ADMINISTRADOR', 'VISUALIZADOR', 'REGISTRADOR'];
      if (!rolesValidos.includes(rol)) {
          return res.status(400).json({ msg: "Rol inválido" });
      }
      
      // Verifica si la cedula está registrada en la base de datos y pertenece a algún agente
      const agenteExistente = await prisma.agente.findUnique({
          where: {
              Cedula: parseInt(agenteID)
          }
      });

      if (!agenteExistente) {
          return res.status(400).json({ msg: "El agente con la cédula proporcionada no existe" });
      }
      // Generar una contraseña aleatoria
      const passwordRandom = Password(); // Aquí generas la contraseña aleatoria

      // Cifrar la contraseña
      const passwordEncrypted = await encrypPassword(passwordRandom);
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
              token: token
          },
      });
      // Enviar correo electrónico de confirmación
      await sendMailToUser(email, token, passwordRandom, nuevoUsuario);
      
      res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
    } catch (error) {
      console.error("Error al crear el nuevo usuario:", error);
      res.status(500).json({ msg: "Ocurrió un error al crear el nuevo usuario" });
    }
};
// Perfil de un nuevo usuario
export const perfil = async (req, res) => {
  try {
    // Eliminar campos no deseados del usuario
    delete req.usuarioBDD.token;
    delete req.usuarioBDD.confirmEmail;
    delete req.usuarioBDD.createdAt;
    delete req.usuarioBDD.updatedAt;
    delete req.usuarioBDD.__v;

    res.status(200).json(req.usuarioBDD);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ msg: 'Ocurrió un error al obtener el perfil del usuario' });
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

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Actualizar un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, actualizar un usuario:', error);
    res.status(500).send('Error, actualizar un usuario');
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Eliminar un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, eliminar un usuario:', error);
    res.status(500).send('Error, eliminar un usuario');
  }
};

// Lista de usuarios
export const listarUsuarios = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Lista de usuarios...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
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

//Recuperar password de un usuario
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
    await sendMailToRecoveryPassword(email, token);

    res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu contraseña" });
  } catch (error) {
    console.error("Error al recuperar la contraseña:", error);
    res.status(500).json({ msg: "Ocurrió un error al recuperar la contraseña" });
  }
};

//Comprobar password de un usuario
export const comprobarTokenPasword = async (req, res) => {
  try {
      if (!req.params.token) {
          return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" });
      }

      let usuarioBDD;

      // Intentar buscar al usuario por su ID
      if (req.params.id) {
          usuarioBDD = await prisma.usuario.findUnique({
              where: {
                  id: parseInt(req.params.id)
              }
          });
      }

      // Si no se encuentra por ID, buscar por el token
      if (!usuarioBDD) {
          usuarioBDD = await prisma.usuario.findFirst({
              where: {
                  token: req.params.token
              }
          });
      }

      // Verificar si el usuario no existe o si su token es diferente
      if (!usuarioBDD || usuarioBDD.token !== req.params.token) {
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

  try {
    if (!password || !confirmpassword) {
      return res.status(404).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    if (password !== confirmpassword) {
      return res.status(404).json({ msg: "Lo sentimos, las contraseñas no coinciden" });
    }

    let usuarioBDD;

    // Buscar al usuario por su id en la base de datos
    if (req.params.id) {
      usuarioBDD = await prisma.usuario.findUnique({
        where: {
          id: parseInt(req.params.id)
        }
      });
    }

    // Aplicar el bloque try-catch solo en este punto para manejar el error al validar la cuenta
    try {
      if (!usuarioBDD) {
        throw new Error("Lo sentimos, no se puede validar la cuenta");
      }
    } catch (error) {
      console.error("Error al validar la cuenta:", error);
      return res.status(404).json({ msg: error.message });
    }

    // Limpiar el token y actualizar la contraseña del usuario en la base de datos
    await prisma.usuario.update({
      where: {
        id: usuarioBDD.id
      },
      data: {
        // Mantener el token existente a menos que sea diferente
        token: usuarioBDD.token === req.params.token ? null : req.params.token,
        password: await encrypPassword(password) // Cifrar la nueva contraseña
      }
    });

    res.status(200).json({ msg: "¡Felicitaciones! Ahora puedes iniciar sesión con tu nueva contraseña" });
  } catch (error) {
    console.error("Error al establecer el nuevo password:", error);
    res.status(500).json({ msg: "Ocurrió un error al establecer el nuevo password" });
  }
};

//Actualizar password de un usuario
export const actualizarPassword = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Actualizar password de un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, actualizar password de un usuario:', error);
    res.status(500).send('Error, actualizar password de un usuario');
  }
};

