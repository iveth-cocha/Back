import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar la base de datos:', error);
    }
};

export default connectDatabase;