import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro un nuevo Agente
export const registrarAgente = async (req, res) => {
  let agentesNuevos = req.body; // Usamos 'let' en lugar de 'const'

  try {
    // Verificar si el agente ya existe basado en la cédula
    const agenteExistente = await prisma.agente.findUnique({
      where: {
        Cedula: agentesNuevos.Cedula,
      },
    });

    if (agenteExistente) {
      return res.status(400).json({ msg: 'La cédula ya está registrada' });
    }

    // Consultar el último valor de ORD en la tabla de agentes
    const ultimoAgente = await prisma.agente.findFirst({
      orderBy: { ORD: 'desc' },
    });

    let nuevoORD;

    // Si no hay ningún agente registrado, asignar 1 como ORD
    if (!ultimoAgente) {
      nuevoORD = 1;
    } else {
      nuevoORD = ultimoAgente.ORD + 1;
    }
    const parseNumericFields = (field) => typeof field === 'number' ? field : parseInt(field, 10);

    // Configurar los valores predeterminados
    agentesNuevos = {
      ...agentesNuevos,
      Direcion_Unidad: 'CIBERPOL',
      Zona: 'ZONA 9',
      SubZona: 'DMQ',
      Distrito_Canton: 'EUGENIO ESPEJO / QUITO',
      ORD: nuevoORD,
      Terno: parseNumericFields(agentesNuevos.Terno),
      Camisa: parseNumericFields(agentesNuevos.Camisa),
      Calzado: parseNumericFields(agentesNuevos.Calzado),
      Cabeza: parseNumericFields(agentesNuevos.Cabeza),
    };

    // Agregar el nuevo agente con el nuevo valor de ORD
    const nuevoAgente = await prisma.agente.create({
      data: agentesNuevos,
    });

    res.status(200).json({ msg: 'Agente agregado correctamente', agente: nuevoAgente });
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error al registrar al agente:', error);
    res.status(500).send('Error al registrar al agente');
  }
};

// Detalle de un Agente
export const detalleAgente = async (req, res) => {
  
  const { cedula } = req.params; // Obtener la cédula del parámetro de la ruta

  try {
    // Realizar la búsqueda del agente
    const agenteDetalle = await prisma.agente.findUnique({
      where: {
        Cedula: cedula?.toString()
      },
    });

    // Verificar si se encontró un agente
    if (!agenteDetalle) {
      res.status(200).json({ msg:`Lo sentimos, no se encontró el agente con la cédula ${cedula}`});
    }
    // Si se encontró un agente, enviarlo en la respuesta
    res.status(200).send(agenteDetalle);
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

  const { cedula } = req.params; // Obtener la cédula del parámetro de la ruta

  try {
    const agenteEliminado = await prisma.agente.findUnique({
      where:{
        Cedula:cedula?.toString()
      }
    });

    if (!agenteEliminado){
      res.status(200).json({msg: 'Agente no encontrado'});
    }

    await prisma.agente.delete({
      where: {
        Cedula: cedula?.toString()
      }
    });

    res.status(200).json({ msg: 'Agente eliminado correctamente', agente: agenteEliminado });
  } catch (error) {
      console.error('Error, al eliminar un agente:', error);
      res.status(500).send('Error, al eliminar un agente');
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
