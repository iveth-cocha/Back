import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro un nuevo Agente
export const registrarAgente = async (req, res) => {
    try {
      const agentesNuevos = req.body; // Suponiendo que recibes todos los datos necesarios para crear un delito en req.body
      const nuevoDelito = await prisma.delito.create({
        data:{
          delito: delitosNuevos.delito,
          seccion: delitosNuevos.seccion
        }
      })
      res.status(200).send('Delito creado correctamente');
    } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error al registrar delito:', error);
      res.status(500).send('Error al registrar delito');
    }
};

// Detalle de un Agente
export const detalleAgente = async (req, res) => {
  try {
    const { cedula } = req.body;

    if (!cedula) {
      return res.status(400).send('Se requiere proporcionar la cedula del agente');
    }

    const agenteEncontrado = await prisma.agente.findFirst({
      where: {
        Cedula: delito.toString()
      }
    });

    if (!agenteEncontrado) {
      return res.status(404).send('No se encontró ningún delito con ese nombre');
    }
    
    res.status(200).send(agenteEncontrado);
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, detalle del agente:', error);
    res.status(500).send('Error, al tener el detalle de un agente');
  }
};

// Actualizar un Agente
export const actualizarAgente = async (req, res) => {
    try {
      const { delito } = req.body;
      const datosDelitoActualizado = req.body; 

      if (!delito) {
        return res.status(400).send('Se requiere proporcionar el nombre del delito');
      }
  
      let delitoExistente;
      if (delito){
        delitoExistente = await prisma.delito.findFirst({
          where: {
            delito: delito.toString()
          }
        });
      }

      if(!delitoExistente){
        return res.status(404).send('No se encontró el delito a actualizar');
      }

      const delitoActualizado = await prisma.delito.update({
        where: {
          id: delitoExistente.id
        },
        data: datosDelitoActualizado
      });
      res.status(200).send(delitoActualizado);
    } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, actualizar un delito:', error);
      res.status(500).send('Error, actualizar un delito');
    }
};
  
// Eliminar un delito
export const eliminarAgente = async (req, res) => {
  try {
    const { delito } = req.body;

    if (!delito) {
      return res.status(400).send('Se requiere proporcionar el nombre del delito');
    }

    const delitoEliminado = await prisma.delito.deleteMany({
      where:{
        delito:delito.toString()
      }
    });

    if (delitoEliminado.count ===0){
      return res.status(404).send('No se encontró ningun delito con ese nombre');
    }

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
      const agente = await prisma.agente.findMany();
      res.status(200).json(agente);
    } catch (error) {
      console.error('Error, lista de usuarios:', error);
      res.status(500).send('Error, lista de usuarios');
    }
};
