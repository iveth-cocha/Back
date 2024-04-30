import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro un nuevo delito
export const registrarDelito = async (req, res) => {
    try {
      const delitosNuevos = req.body; // Suponiendo que recibes todos los datos necesarios para crear un delito en req.body
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

// Detalle de un delito
export const detalleDelito = async (req, res) => {
  try {
    const { delito } = req.body;

    if (!delito) {
      return res.status(400).send('Se requiere proporcionar el nombre del delito');
    }

    const delitoEncontrado = await prisma.delito.findFirst({
      where: {
        delito: delito.toString()
      }
    });

    if (!delitoEncontrado) {
      return res.status(404).send('No se encontró ningún delito con ese nombre');
    }
    
    res.status(200).send(delitoEncontrado);
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, detalle de un delito:', error);
    res.status(500).send('Error, detalle de un delito');
  }
};

// Actualizar un delito
export const actualizarDelito = async (req, res) => {
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
export const eliminarDelito = async (req, res) => {
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

// Listar un delito
export const listarDelitos = async (req, res) => {
    try {
      const delitos = await prisma.delito.findMany();
      res.status(200).json(delitos);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error, listar delitos:', error);
        res.status(500).send('Error, listar delitos');
    }
};

// Listar un delito
export const listarLocalizaciones = async (req, res) => {
  try {
    const localizacion = await prisma.localidad.findMany();
    res.status(200).json(localizacion);
  } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, listar localizaciones:', error);
      res.status(500).send('Error, listar localizaciones');
  }
};