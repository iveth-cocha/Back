import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Listar mapeos
export const listarMapeos = async (req, res) => {
    try {
        const mapeos = await prisma.mapeo.findMany();
        res.status(200).json(mapeos);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error, listar delegaciones:', error);
        res.status(500).send('Error, listar mapeos');
    }
};

//Eliminar todos mapeos
export const eliminarTodosLosMapeos = async (req, res) => {
  try {
      // Eliminar todos los registros de la tabla mapeo
      await prisma.mapeo.deleteMany();

      // Envía una respuesta indicando que todos los mapeos han sido eliminados con éxito
      res.status(200).json({ msg: "Todos los mapeos han sido eliminados correctamente" });
  } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error al eliminar todos los mapeos:', error);
      res.status(500).json({ msg: "Error al eliminar todos los mapeos" });
  }
};