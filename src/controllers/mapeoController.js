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