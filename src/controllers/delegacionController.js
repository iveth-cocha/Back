import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro una nueva delegación
export const registrarDelegacion = async (req, res) => {

    const datosDelegacion = req.body; // Suponiendo que recibes todos los datos necesarios para crear una delegación en req.body

    try {  
        const añoActual = new Date().getFullYear(); // Obtenemos el año actual

        // Consultamos el último valor de orden para incrementarlo
        const ultimoOrden = await prisma.delegacion.findFirst({
            select: {
                orden: true,
                anio_ingreso: true
            },
            orderBy: {
                orden: 'desc'
            }
        });
        
        // Si hay registros existentes, incrementamos el orden en 1; de lo contrario, comenzamos desde 1
        let ordenInicial = 1;
        
        if (ultimoOrden && ultimoOrden.anio_ingreso === añoActual) {
            ordenInicial = ultimoOrden.orden + 1;
        }
        
        const nuevoOrden = Math.max(ultimoOrden ? ultimoOrden.orden + 1 : 1, ordenInicial);
        
        // Validar que los números de investigación previa e instrucción fiscal no estén repetidos
        const { numero_investigacion_previa, numero_instruccion_fiscal } = datosDelegacion;

        const delegacionExistentePorInvestigacionPrevia = await prisma.delegacion.findFirst({
            where: {
                numero_investigacion_previa: numero_investigacion_previa
            }
        });

        const delegacionExistentePorInstruccionFiscal = await prisma.delegacion.findFirst({
            where: {
                numero_instruccion_fiscal: numero_instruccion_fiscal
            }
        });

        if (delegacionExistentePorInvestigacionPrevia) {
            return res.status(400).json({ error: 'El número de investigación previa ya está registrado' });
        }

        if (delegacionExistentePorInstruccionFiscal) {
            return res.status(400).json({ error: 'El número de instrucción fiscal ya está registrado' });
        }

        // Verificar si los números de investigación previa e instrucción fiscal son iguales
        if (numero_investigacion_previa === numero_instruccion_fiscal) {
            return res.status(400).json({ error: 'Los números de investigación previa e instrucción fiscal no pueden ser iguales' });
        }

        const nuevaDelegacion = await prisma.delegacion.create({
            data: {
                anio_ingreso: añoActual,
                orden: nuevoOrden,
                mes_ingreso: datosDelegacion.mes_ingreso,
                numero_investigacion_previa: datosDelegacion.numero_investigacion_previa,
                numero_instruccion_fiscal: datosDelegacion.numero_instruccion_fiscal,
                grado_agente: datosDelegacion.grado_agente,
                apellidos_nombres_agente: datosDelegacion.apellidos_nombres_agente,
                zona: datosDelegacion.zona,
                provincia: datosDelegacion.provincia,
                canton: datosDelegacion.canton,
                cod_distrito: datosDelegacion.cod_distrito,
                distrito: datosDelegacion.distrito,
                tipo_delito: datosDelegacion.tipo_delito,
                delito_tipificado_delegacion: datosDelegacion.delito_tipificado_delegacion,
                delito_desagregacion_policia_judicial: datosDelegacion.delito_desagregacion_policia_judicial,
                fecha_infraccion_delito: datosDelegacion.fecha_infraccion_delito,
                apellidos_nombres_victima: datosDelegacion.apellidos_nombres_victima,
                sexo_victima: datosDelegacion.sexo_victima,
                edad_victima: datosDelegacion.edad_victima,
                apellidos_nombres_sospechoso: datosDelegacion.apellidos_nombres_sospechoso,
                condicion_infractor_involucrado: datosDelegacion.condicion_infractor_involucrado,
                parentesco_detenido_sospechoso_victima: datosDelegacion.parentesco_detenido_sospechoso_victima,
                alias_sospechoso: datosDelegacion.alias_sospechoso,
                placa_vehiculo_involucrado: datosDelegacion.placa_vehiculo_involucrado,
                apellidos_nombres_fiscal: datosDelegacion.apellidos_nombres_fiscal,
                unidad_especializada: datosDelegacion.unidad_especializada,
                fecha_delegacion: datosDelegacion.fecha_delegacion,
                fecha_recepcion_pj: datosDelegacion.fecha_recepcion_pj,
                fecha_recepcion_agente_investigador: datosDelegacion.fecha_recepcion_agente_investigador,
                no_oficio_recibe_diligencia: datosDelegacion.no_oficio_recibe_diligencia,
                plazo_otorgado_dias: datosDelegacion.plazo_otorgado_dias,
                numero_articulo: datosDelegacion.numero_articulo,
                articulos_cumplidos: datosDelegacion.articulos_cumplidos,
                cumplimiento_parcial: datosDelegacion.cumplimiento_parcial,
                cumplimiento_total: datosDelegacion.cumplimiento_total,
                fecha_cumplimiento: datosDelegacion.fecha_cumplimiento,
                en_investigacion: datosDelegacion.en_investigacion,
                numero_oficio_descargo: datosDelegacion.numero_oficio_descargo,
                versiones: datosDelegacion.versiones,
                reconocimientos_lugar_hechos: datosDelegacion.reconocimientos_lugar_hechos,
                determino_posibles_responsables: datosDelegacion.determino_posibles_responsables,
                comparecencia_sospechoso: datosDelegacion.comparecencia_sospechoso,
                peticiones_fiscalia: datosDelegacion.peticiones_fiscalia,
                tipo_peticion: datosDelegacion.tipo_peticion,
                no_boletas_solicitadas: datosDelegacion.no_boletas_solicitadas,
                nombre_requerido_boleta: datosDelegacion.nombre_requerido_boleta,
                no_detenidos_producto_investigacion: datosDelegacion.no_detenidos_producto_investigacion,
                apellidos_nombres_detenidos_producto: datosDelegacion.apellidos_nombres_detenidos_producto,
                allanamientos_numero: datosDelegacion.allanamientos_numero,
                recuperacion_bienes_evidencias: datosDelegacion.recuperacion_bienes_evidencias,
                recuperacion_automotores: datosDelegacion.recuperacion_automotores,
                recuperacion_otros: datosDelegacion.recuperacion_otros,
                peritajes: datosDelegacion.peritajes,
                notificaciones: datosDelegacion.notificaciones,
                citaciones: datosDelegacion.citaciones,
                traslados: datosDelegacion.traslados,
                informe_descargo: datosDelegacion.informe_descargo,
                causas_incumplimiento_investigacion: datosDelegacion.causas_incumplimiento_investigacion,
                nombre_detenidos_producto_investigacion: datosDelegacion.nombre_detenidos_producto_investigacion,
                observaciones: datosDelegacion.observaciones,
                cantidad_sustraida: datosDelegacion.cantidad_sustraida,
                entidad_financiera: datosDelegacion.entidad_financiera,
            }
        });
        
        // Envía una respuesta indicando que se ha creado la delegación con éxito
        res.status(200).json({ mensaje: 'Delegación agregada correctamente', delegacion: nuevaDelegacion });
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al registrar la delegación:', error);
        res.status(500).send('Error al registrar la delegación');
    }
};

  
// Detalle de una delegacion
export const detalleDelegacion = async (req, res) => {

    const { id } = req.params; // Obtener el id del parámetro de la ruta

    try {

        const delegacionDetalle = await prisma.delegacion.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        // Verificar si se encontró un agente
        if (!delegacionDetalle) {
            return res.status(404).send( `Lo sentimos, no se encontró la delegación con el ID ${id}`);
        }

        // Si se encontró la delegación, enviarla como respuesta
        res.status(200).json(delegacionDetalle);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al obtener detalle de la delegación:', error);
        res.status(500).send('Error al obtener detalle de la delegación');
    }
};

// Actualizar una delegacion
export const actualizarDelegacion = async (req, res) => {

const { id } = req.params;
const datosActualizadosDelegacion = req.body;

try {
    
    const delegacion = await prisma.delegacion.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    // Verificar si se encontró al usuario
    if (!delegacion) {
        return res.status(404).json({ msg: `Lo sentimos, no se encontró la delegacion con ID ${id}` });
    }

    // Actualizar el la delegacion
    await prisma.delegacion.update({
        where: {
            id: parseInt(id),
        },
        data: datosActualizadosDelegacion // Actualizar con los datos proporcionados en el cuerpo de la solicitud
    });

    res.status(200).json({ msg: "Perfil actualizado correctamente" });

} catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error al actualizar la delegación:', error);
    res.status(500).send('Error al actualizar la delegación');
}
};

// Eliminar una delegacion
export const eliminarDelegacion = async (req, res) => {
    
    const { id } = req.params;

    try {

        const delegacionEliminada = await prisma.delegacion.findUnique({
            where: {
              id: Number(id),
            },
        });

        if (!delegacionEliminada) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await prisma.delegacion.delete({
            where: {
              id: Number(id),
            },
        });

        res.status(200).json({ msg: 'Usuario eliminado correctamente', delegacion: delegacionEliminada });
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al eliminar la delegación:', error);
        res.status(500).send('Error al eliminar la delegación');
    }
};

// Listar delegaciones
export const listarDelegaciones = async (req, res) => {
    try {
        const delegacion = await prisma.delegacion.findMany();
        res.status(200).json(delegacion);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error, listar delegaciones:', error);
        res.status(500).send('Error, listar delegaciones');
    }
};
  
