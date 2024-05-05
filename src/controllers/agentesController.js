import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro un nuevo Agente
export const registrarAgente = async (req, res) => {
    try {
      const agentesNuevos = req.body; // Suponiendo que recibes todos los datos necesarios para crear un delito en req.body

      const nuevoAgente = await prisma.agente.create({
        data:{
          Direcion_Unidad: agentesNuevos.Direcion_Unidad,
          Grado: agentesNuevos.Grado,
          Apellido_Nombre: agentesNuevos.Apellido_Nombre,
          Cedula: agentesNuevos.Cedula,
          Zona: agentesNuevos.Zona,
          SubZona: agentesNuevos.SubZona,
          Distrito_Canton: agentesNuevos.Distrito_Canton,
          PaseDNTH: agentesNuevos.PaseDNTH,
          Funcion: agentesNuevos.Funcion,
          Novedad: agentesNuevos.Novedad,
          Detalle: agentesNuevos.Detalle,
          Documento: agentesNuevos.Documento,
          Titulo: agentesNuevos.Titulo,
          IdiomaExtranjero: agentesNuevos.IdiomaExtranjero,
          Licencia: agentesNuevos.Licencia,
          Residencia: agentesNuevos.Residencia,
          Estado_Civil: agentesNuevos.Estado_Civil,
          FechaNacimiento: agentesNuevos.FechaNacimiento,
          Genero: agentesNuevos.Genero,
          Telefono: agentesNuevos.Telefono,
          Email: agentesNuevos.Email,
          NombresFamiliar: agentesNuevos.NombresFamiliar,
          Parentesco: agentesNuevos.Parentesco,
          TelefonoFamiliar: agentesNuevos.TelefonoFamiliar,
          Terno: agentesNuevos.Terno,
          Camisa: agentesNuevos.Camisa,
          Calzado: agentesNuevos.Calzado,
          Cabeza: agentesNuevos.Cabeza
        }
      })
      res.status(200).send('Agente agregado correctamente');
    } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error al registrar delito:', error);
      res.status(500).send('Error al registrar delito');
    }finally {
      await prisma.$disconnect(); // Cierra la conexión a la base de datos
  }
};

// Detalle de un Agente
export const detalleAgente = async (req, res) => {

  const { cedula } = req.body;

  try {
    if (!cedula) {
      return res.status(400).send('Se requiere proporcionar la cedula del agente');
    }

    // Realizar la búsqueda del agente
    const agenteEncontrado = await prisma.agente.findFirst({
      where: {
        Cedula: cedula?.toString()
      }
    });

    // Verificar si se encontró un agente
    if (!agenteEncontrado) {
      return res.status(404).send('No se encontró ningún agente con esa cedula');
    }

    // Si se encontró un agente, enviarlo en la respuesta
    res.status(200).send(agenteEncontrado);
  } catch (error) {
    // Si hay algún error, enviar una respuesta de error
    console.error('Error, detalle del agente:', error);
    res.status(500).send('Error, al tener el detalle de un agente');
  }
};

// Actualizar un Agente
export const actualizarAgente = async (req, res) => {
  const { cedula } = req.params; // Obtener la cédula del parámetro de la ruta
  const datosActualizadosAG = req.body; // Datos actualizados del agente

  try {
    // Buscar al agente por su cédula
    const agenteActualizado = await prisma.agente.findUnique({
      where: {
        Cedula: cedula?.toString()
      },
    });

    // Verificar si se encontró al agente
    if (!agenteActualizado) {
      return res.status(404).json({ msg: `Lo sentimos, no se encontró el agente con la cédula ${cedula}` });
    }
  
    // Actualizar el perfil del agente
    await prisma.agente.update({
      where: {
        Cedula: cedula?.toString(),
      },
      data: datosActualizadosAG // Actualizar con los datos proporcionados en el cuerpo de la solicitud
    });

    res.status(200).json({ msg: "Perfil actualizado correctamente" });
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error al actualizar un agente:', error);
    res.status(500).send('Error al actualizar un agente');
  }
};


  
// Eliminar un delito
export const eliminarAgente = async (req, res) => {

  const { cedula } = req.body;

  try {

    if (!cedula) {
      return res.status(400).send('Se requiere proporcionar una cedula de un Agente');
    }

    const agenteEliminado = await prisma.agente.findUnique({
      where:{
        Cedula:cedula?.toString()
      }
    });

    if (!agenteEliminado){
      return res.status(404).send('Agente no encontrado');
    }

    await prisma.agente.delete({
      where: {
        Cedula: cedula?.toString()
      }
    });

    res.status(200).send('Delito eliminado correctamente');
  } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, eliminar un delito:', error);
      res.status(500).send('Error, eliminar un delito');
  }
};

// Lista de usuarios
export const listarAgentes = async (req, res) => {
    try {
      const agentes = await prisma.agente.findMany();
      res.status(200).json(agentes);
    } catch (error) {
      console.error('Error, lista de usuarios:', error);
      res.status(500).send('Error, lista de usuarios');
    }
};
