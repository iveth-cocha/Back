import { Password, encrypPassword,matchPassword, generarToken } from '../middlewares/bcrypt.js';
import sendMailToUser  from '../config/nodemailer.js'; 
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

    // Extraer los campos necesarios del usuario para la respuesta
    const { nombre, Rol, agenteID, agente} = usuarioBDD;
    const grado = agente.Grado; // Suponiendo que "grado" es un campo en la tabla Agente


    // Enviar una respuesta exitosa con los detalles del usuario
    res.status(200).json({
      agenteID,
      grado,
      nombre,
      Rol,
      
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

      // Crear un nuevo usuario en la base de datos
      const nuevoUsuario = await prisma.usuario.create({
          data: {
              nombre: nombre,
              email: email,
              password: passwordEncrypted,
              Rol: rol,
              agente: {
                  connect: { Cedula: agenteID }
              }
          },
      });

      // Generar el token para el nuevo usuario
      const token = generarToken();
      
      // Almacenar el token en el objeto nuevoUsuario
      await prisma.usuario.update({
          where: {
              id: nuevoUsuario.id
          },
          data: {
              token: token
          }
      });

      // Enviar correo electrónico de confirmación
      await sendMailToUser(email, token, passwordRandom);
      
      res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
    } catch (error) {
      console.error("Error al crear el nuevo usuario:", error);
      res.status(500).json({ msg: "Ocurrió un error al crear el nuevo usuario" });
    }
};


// Perfil de un nuevo usuario
export const perfil = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Perfil de un nuevo usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, perfil de un nuevo usuario:', error);
    res.status(500).send('Error, perfil de un nuevo usuario');
  }
};

// Detalle de un usuario
export const detalleUsuario = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Detalle de un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, detalle de un usuario:', error);
    res.status(500).send('Error, detalle de un usuario');
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

// Confimar email de un usuario
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
        token: null,
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
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Recuperar password de un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, recuperar password de un usuario:', error);
    res.status(500).send('Error, recuperar password de un usuario');
  }
};

//Comprobar password de un usuario
export const comprobarTokenPasword = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Comprobar password de un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, comprobar password de un usuario:', error);
    res.status(500).send('Error, comprobar password de un usuario');
  }
};

//Nuevo password de un usuario
export const nuevoPassword = async (req, res) => {
  try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Nuevo password de un usuario...');
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, nuevo password de un usuario:', error);
    res.status(500).send('Error, nuevo password de un usuario');
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

