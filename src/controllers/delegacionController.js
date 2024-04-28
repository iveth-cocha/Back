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
        const { numero_investigacion_previa, numero_instruccion_fiscal } = req.body;

        // Verificar si se proporcionó alguno de los números de investigación previa o instrucción fiscal
        if (!numero_investigacion_previa && !numero_instruccion_fiscal) {
            return res.status(400).send('Se requiere proporcionar al menos un número de investigación previa o un número de instrucción fiscal');
        }

        let delegacionEncontrada;

        // Buscar la delegación por el número de investigación previa si se proporcionó
        if (numero_investigacion_previa) {
            delegacionEncontrada = await prisma.delegacion.findFirst({
                where: {
                    numero_investigacion_previa: numero_investigacion_previa.toString()
                }
            });
        }

        // Si no se encontró la delegación por el número de investigación previa, buscar por el número de instrucción fiscal
        if (!delegacionEncontrada && numero_instruccion_fiscal) {
            delegacionEncontrada = await prisma.delegacion.findFirst({
                where: {
                    numero_instruccion_fiscal: numero_instruccion_fiscal.toString()
                }
            });
        }

        // Verificar si se encontró alguna delegación
        if (!delegacionEncontrada) {
            return res.status(404).send('No se encontró ninguna delegación con los números proporcionados');
        }

        // Si se encontró la delegación, enviarla como respuesta
        res.status(200).json(delegacionEncontrada);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al obtener detalle de la delegación:', error);
        res.status(500).send('Error al obtener detalle de la delegación');
    }
};

// Actualizar una delegacion
export const actualizarDelegacion = async (req, res) => {
    try {
        const { numero_investigacion_previa, numero_instruccion_fiscal } = req.body; // Números de investigación previa e instrucción fiscal
        const datosActualizados = req.body; // Datos actualizados de la delegación
        
        // Verificar si se proporcionó al menos uno de los números de investigación previa o instrucción fiscal
        if (!numero_investigacion_previa && !numero_instruccion_fiscal) {
            return res.status(400).send('Se requiere proporcionar al menos un número de investigación previa o un número de instrucción fiscal');
        }

        // Buscar la delegación por el número de investigación previa si se proporcionó
        let delegacionExistente;
        if (numero_investigacion_previa) {
            delegacionExistente = await prisma.delegacion.findFirst({
                where: {
                    numero_investigacion_previa: numero_investigacion_previa.toString()
                }
            });
        }

        // Si no se encontró la delegación por el número de investigación previa, buscar por el número de instrucción fiscal
        if (!delegacionExistente && numero_instruccion_fiscal) {
            delegacionExistente = await prisma.delegacion.findFirst({
                where: {
                    numero_instruccion_fiscal: numero_instruccion_fiscal.toString()
                }
            });
        }

        // Verificar si se encontró la delegación a actualizar
        if (!delegacionExistente) {
            return res.status(404).send('No se encontró la delegación a actualizar');
        }

        // Actualizar la delegación con los nuevos datos
        const delegacionActualizada = await prisma.delegacion.update({
            where: {
                id: delegacionExistente.id
            },
            data: datosActualizados
        });

        // Enviar respuesta con la delegación actualizada
        res.status(200).json(delegacionActualizada);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al actualizar la delegación:', error);
        res.status(500).send('Error al actualizar la delegación');
    }
};

// Eliminar una delegacion
export const eliminarDelegacion = async (req, res) => {
    try {
        const { numero_investigacion_previa, numero_instruccion_fiscal } = req.body; // Números de investigación previa e instrucción fiscal

        // Verificar si se proporcionó al menos uno de los números de investigación previa o instrucción fiscal
        if (!numero_investigacion_previa && !numero_instruccion_fiscal) {
            return res.status(400).send('Se requiere proporcionar al menos un número de investigación previa o un número de instrucción fiscal');
        }

        // Eliminar la delegación que coincida con los números de investigación previa e instrucción fiscal proporcionados
        const delegacionEliminada = await prisma.delegacion.deleteMany({
            where: {
                OR: [
                    {
                        numero_investigacion_previa: numero_investigacion_previa ? numero_investigacion_previa.toString() : undefined
                    },
                    {
                        numero_instruccion_fiscal: numero_instruccion_fiscal ? numero_instruccion_fiscal.toString() : undefined
                    }
                ]
            }
        });

        // Verificar si se eliminó alguna delegación
        if (delegacionEliminada.count === 0) {
            return res.status(404).send('No se encontró ninguna delegación con los números proporcionados');
        }

        // Enviar respuesta indicando que la delegación se eliminó correctamente
        res.status(200).json({ msg: 'Delegación eliminada correctamente' });
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
  
