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

//detalle mapeo
export const detalleMapeo = async (req, res) => {
    const { id } = req.params;
    try {
  
      // Buscar al mapeo por el token de sesión en la base de datos
      const mapeoDetalle = await prisma.mapeo.findFirst({
        where: {
            id: parseInt(id) // Asegúrate de convertir el id a un número si es necesario
        }
      });
  
      // Si se encontró un mapeo, enviarlo en la respuesta
      res.status(200).send(mapeoDetalle);
    } catch (error) {
      // Si hay algún error, enviar una respuesta de error
      console.error('Error, detalle del mapeo:', error);
      res.status(500).send('Error, al obtener el detalle del mapeo');
    }
  };
