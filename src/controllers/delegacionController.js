import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro una nueva delegación
export const registrarDelegacion = async (req, res) => {
    try {
        const datosDelegacion = req.body; // Suponiendo que recibes todos los datos necesarios para crear una delegación en req.body
  
        const añoActual = new Date().getFullYear(); // Obtenemos el año actual
        
        // Consultamos el último valor de orden para incrementarlo
        const ultimoOrden = await prisma.delegacion.findFirst({
            select: {
                orden: true
            },
            orderBy: {
                orden: 'desc'
            }
        });
  
        // Si hay registros existentes, incrementamos el orden en 1; de lo contrario, comenzamos desde 1
        let ordenInicial = 1;
        if (ultimoOrden) {
            ordenInicial = ultimoOrden.orden + 1;
        }
  
        const nuevaDelegacion = await prisma.delegacion.create({
            data: {
                anio_ingreso: datosDelegacion.anio_ingreso,
                orden: datosDelegacion.orden,
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
                observaciones: datosDelegacion.observaciones,
                cantidad_sustraida: datosDelegacion.cantidad_sustraida,
                entidad_financiera: datosDelegacion.entidad_financiera,
            }
        });
        
        // Envía una respuesta indicando que se ha creado la delegación con éxito
        res.status(200).send('Delegación registrada correctamente');
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al registrar la delegación:', error);
        res.status(500).send('Error al registrar la delegación');
    } finally {
        await prisma.$disconnect(); // Cierra la conexión a la base de datos
    }
  };
  
// Detalle de una delegacion
export const detalleDelegacion = async (req, res) => {
    try {
      // Aquí iría la lógica para crear un usuario utilizando Prisma
      // Envía una respuesta indicando que se está creando un usuario
      res.status(200).send('Detalle de una delegacion...');
    } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, detalle de una delegacion:', error);
      res.status(500).send('Error, detalle de una delegacion');
    }
};

// Actualizar una delegacion
export const actualizarDelegacion = async (req, res) => {
    try {
      // Aquí iría la lógica para crear un usuario utilizando Prisma
      // Envía una respuesta indicando que se está creando un usuario
      res.status(200).send('Actualizar una delegacion...');
    } catch (error) {
      // Si hay algún error, envía una respuesta de error
      console.error('Error, actualizar una delegacion:', error);
      res.status(500).send('Error, una delegacion');
    }
};
  
// Eliminar una delegacion
export const eliminarDelegacion = async (req, res) => {
try {
    // Aquí iría la lógica para crear un usuario utilizando Prisma
    // Envía una respuesta indicando que se está creando un usuario
    res.status(200).send('Eliminar una delegacion...');
} catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error, eliminar una delegacion:', error);
    res.status(500).send('Error, eliminar una delegacion');
}
};

// Listar delegaciones
export const listarDelegaciones = async (req, res) => {
    try {
        // Aquí iría la lógica para crear un usuario utilizando Prisma
        // Envía una respuesta indicando que se está creando un usuario
        res.status(200).send('Listar delegaciones...');
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error, listar delegaciones:', error);
        res.status(500).send('Error, listar delegaciones');
    }
};
  
