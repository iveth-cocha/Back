import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controlador para el mapeo de sesiones
export const mapeoSesionController = {
  // Método para crear un nuevo registro de mapeo de sesión
  async crearMapeoSesion(userId, sessionId, accionRealizada) {
    try {
      const nuevoMapeoSesion = await prisma.mapeo.create({
        data: {
          usuarioId: userId,
          sessionId: sessionId,
          accionRealizada: accionRealizada,
        },
      });
      return nuevoMapeoSesion;
    } catch (error) {
      console.error('Error al crear el mapeo de sesión:', error);
      throw error;
    }
  },

  // Método para actualizar un registro de mapeo de sesión existente
  async actualizarMapeoSesion(sessionId, fechaHoraS) {
    try {
      const mapeoSesionActualizado = await prisma.mapeo.update({
        where: { sessionId: sessionId },
        data: { fechaHoraS: fechaHoraS },
      });
      return mapeoSesionActualizado;
    } catch (error) {
      console.error('Error al actualizar el mapeo de sesión:', error);
      throw error;
    }
  },
};
