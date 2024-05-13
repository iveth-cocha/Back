import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro un nuevo delito
export const registrarDelito = async (req, res) => {
  const delitoNuevo = req.body;

  try {
      // Verificar si ya existe un delito con el mismo nombre y sección
      const delitoExistente = await prisma.delito.findFirst({
          where: {
              delito: delitoNuevo.delito,
              seccion: delitoNuevo.seccion
          }
      });

      if (delitoExistente) {
          return res.status(400).json({ mensaje: "Este delito ya está registrado" });
      }

      // Si no existe, crear un nuevo delito
      const nuevoDelito = await prisma.delito.create({
          data: delitoNuevo
      });

      res.status(200).json({ mensaje: 'Delito agregado correctamente', delito: nuevoDelito });
  } catch (error) {
      console.error('Error al registrar delito:', error);
      res.status(500).send('Error al registrar delito');
  }
};


// Detalle de un delito
export const detalleDelito = async (req, res) => {

  const { id } = req.params;

  try {

    const delitoDetalle = await prisma.delito.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    if (!delitoDetalle) {
      return res.status(404).send(`Lo sentimos, no se encontró el delito con el id: ${id}`);
    }
    
    res.status(200).send(delitoDetalle);
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, detalle de un delito:', error);
    res.status(500).send('Error, detalle de un delito');
  }
};

// Actualizar un delito
export const actualizarDelito = async (req, res) => {

  const { id } = req.params;
  const datosDelitoActualizado = req.body; 

    try {

      const delitoExistente = await prisma.delito.findUnique({
        where: {
            id: parseInt(id),
        },
      });

      if(!delitoExistente){
        return res.status(404).json({ msg: `Lo sentimos, no se encontró el delito con ID ${id}` });
      }

      await prisma.delito.update({
        where: {
            id: parseInt(id),
        },
        data: datosDelitoActualizado // Actualizar con los datos proporcionados en el cuerpo de la solicitud

      });
      res.status(200).send(datosDelitoActualizado);
    } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, actualizar un delito:', error);
      res.status(500).send('Error, actualizar un delito');
    }
};
  
// Eliminar un delito
export const eliminarDelito = async (req, res) => {
  const { id } = req.params;

  try {
    const delitoEliminado = await prisma.delito.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!delitoEliminado) {
      return res.status(404).json({ msg: 'Delito no encontrado' });
    }

    // Eliminar el delito de la base de datos
    await prisma.delito.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ msg: 'Delito eliminado correctamente', delito: delitoEliminado });
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error al eliminar un delito:', error);
    res.status(500).send('Error al eliminar un delito');
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

// Listar localizaciones
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

// Listar localizaciones
export const listarFiscalias = async (req, res) => {
  try {
    const fiscalia = await prisma.ficalia.findMany();
    res.status(200).json(fiscalia);
  } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, listar fiscalias:', error);
      res.status(500).send('Error, listar fiscalia');
  }
};