import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Registro una nueva delegación
export const registrarDelegacion = async (req, res) => {

    function bigIntToString(obj) {
        return JSON.parse(JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
    }

    const datosDelegacion = req.body;

    try {

        const añoActual = new Date().getFullYear();

        const ultimoOrden = await prisma.delegacion.findFirst({
            select: {
                orden: true
            },
            where: {
                anio_ingreso: añoActual
            },
            orderBy: {
                orden: 'desc'
            }
        });

        let nuevoOrden = 1;

        if (ultimoOrden) {
            nuevoOrden = ultimoOrden.orden + 1;
        }

        const { numero_investigacion_previa, numero_instruccion_fiscal } = datosDelegacion;

        // Validar que al menos uno de los campos esté presente
        if ((!numero_investigacion_previa || numero_investigacion_previa === null) &&
            (!numero_instruccion_fiscal || numero_instruccion_fiscal.trim() === "")) {
            return res.status(400).json({ msg: "Debe proporcionar al menos un número de investigación previa o instrucción fiscal" });
        }

        // Convertir ambos valores a cadenas de texto para la comparación
        const numeroInvestigacionPreviaStr = numero_investigacion_previa !== null ? String(numero_investigacion_previa) : null;
        const numeroInstruccionFiscalStr = numero_instruccion_fiscal ? numero_instruccion_fiscal.trim() : "";

        // Validar si los números son iguales cuando ambos están presentes y no son null ni vacíos
        if (numeroInvestigacionPreviaStr && numeroInstruccionFiscalStr &&
            numeroInvestigacionPreviaStr === numeroInstruccionFiscalStr) {
            return res.status(400).json({ msg: "Los números de investigación previa e instrucción fiscal no pueden ser iguales" });
        }

        // Verificar si alguno de los campos está presente y ya existe en la base de datos
        if (numero_investigacion_previa && numero_investigacion_previa !== null) {
            const delegacionExistentePorInvestigacionPrevia = await prisma.delegacion.findFirst({
                where: {
                    numero_investigacion_previa: numero_investigacion_previa
                }
            });

            if (delegacionExistentePorInvestigacionPrevia) {
                // Si la delegación ya existe, obtenemos el nombre del agente asociado
                const gradoAgente = delegacionExistentePorInvestigacionPrevia.grado_agente;
                const nombreAgente = delegacionExistentePorInvestigacionPrevia.apellidos_nombres_agente;
                return res.status(400).json({ msg: `La delegación ya está registrada y asiganada al agente: ${gradoAgente}${nombreAgente}` });
            }
        }

        if (numero_instruccion_fiscal && numero_instruccion_fiscal.trim() !== "") {
            const delegacionExistentePorInstruccionFiscal = await prisma.delegacion.findFirst({
                where: {
                    numero_instruccion_fiscal: numero_instruccion_fiscal
                }
            });

            if (delegacionExistentePorInstruccionFiscal) {
                // Si la delegación ya existe, obtenemos el nombre del agente asociado
                const gradoAgente = delegacionExistentePorInstruccionFiscal.grado_agente;
                const nombreAgente = delegacionExistentePorInstruccionFiscal.apellidos_nombres_agente;
                return res.status(400).json({ msg: `La delegación ya está registrada y asiganada al agente: ${gradoAgente}${nombreAgente}` });
            }
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
        res.status(200).json({
            msg: 'Delegación agregada correctamente',
            delegacion: bigIntToString(nuevaDelegacion) // Convertir BigInt a string
        });
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
            select: {
                id: true,
                numero_investigacion_previa: true,
                numero_instruccion_fiscal: true,
                mes_ingreso: true,
                apellidos_nombres_agente: true,
                grado_agente: true,
                cod_distrito: true,
                distrito: true,
                zona: true,
                canton: true,
                provincia: true,
                tipo_delito: true,
                delito_tipificado_delegacion: true,
                delito_desagregacion_policia_judicial: true,
                fecha_infraccion_delito: true,
                apellidos_nombres_victima: true,
                sexo_victima: true,
                edad_victima: true,
                apellidos_nombres_sospechoso: true,
                condicion_infractor_involucrado: true,
                parentesco_detenido_sospechoso_victima: true,
                alias_sospechoso: true,
                placa_vehiculo_involucrado: true,
                apellidos_nombres_fiscal: true,
                unidad_especializada: true,
                fecha_delegacion: true,
                fecha_recepcion_pj: true,
                fecha_recepcion_agente_investigador: true,
                no_oficio_recibe_diligencia: true,
                plazo_otorgado_dias: true,
                numero_articulo: true,
                articulos_cumplidos: true,
                cumplimiento_parcial: true,
                cumplimiento_total: true,
                fecha_cumplimiento: true,
                en_investigacion: true,
                numero_oficio_descargo: true,
                versiones: true,
                reconocimientos_lugar_hechos: true,
                determino_posibles_responsables: true,
                comparecencia_sospechoso: true,
                peticiones_fiscalia: true,
                tipo_peticion: true,
                nombre_requerido_boleta: true,
                apellidos_nombres_detenidos_producto: true,
                no_boletas_solicitadas: true,
                no_detenidos_producto_investigacion: true,
                allanamientos_numero: true,
                recuperacion_bienes_evidencias: true,
                recuperacion_automotores: true,
                recuperacion_otros: true,
                notificaciones: true,
                citaciones: true,
                peritajes: true,
                traslados: true,
                informe_descargo: true,
                causas_incumplimiento_investigacion: true,
                nombre_detenidos_producto_investigacion: true,
                observaciones: true,
                cantidad_sustraida: true,
                entidad_financiera: true,

            },
        });

        // Verificar si se encontró una delegación
        if (!delegacionDetalle) {
            return res.status(404).json({ msg: `Lo sentimos, no se encontró la delegación con el id ${id}` });
        }

        // Convertir los valores de BigInt a String o a un tipo de dato compatible directamente en el objeto delegacionDetalle
        const delegacionDetalleString = {
            ...delegacionDetalle,
            numero_investigacion_previa: delegacionDetalle.numero_investigacion_previa ? delegacionDetalle.numero_investigacion_previa.toString() : null,
            // Añade más conversiones aquí según sea necesario
        };
        // Enviar la delegación como respuesta JSON
        res.status(200).json(delegacionDetalleString);
    } catch (error) {
        // Si hay algún error, enviar una respuesta de error
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
            return res.status(404).json({ msg: `Lo sentimos, no se encontró la delegacion con id ${id}` });
        }

        // Actualizar el la delegacion
        await prisma.delegacion.update({
            where: {
                id: parseInt(id),
            },
            data: datosActualizadosDelegacion // Actualizar con los datos proporcionados en el cuerpo de la solicitud
        });

        res.status(200).json({ msg: "Delegación actualizada correctamente" });

    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al actualizar la delegación:', error);
        res.status(500).send('Error al actualizar la delegación');
    }
};

// Eliminar una delegacion
export const eliminarDelegacion = async (req, res) => {

    function bigIntToString(obj) {
        return JSON.parse(JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
    }

    const { id } = req.params;

    try {
        const delegacionEliminada = await prisma.delegacion.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!delegacionEliminada) {
            return res.status(404).json({ msg: 'Delegación no encontrada' });
        }

        await prisma.delegacion.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(200).json({
            msg: 'Delegación eliminada correctamente',
            delegacion: bigIntToString(delegacionEliminada)
        });
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error al eliminar la delegación:', error);
        res.status(500).send('Error al eliminar la delegación');
    }
};

// Listar delegaciones
export const listarDelegaciones = async (req, res) => {
    try {
        const delegaciones = await prisma.delegacion.findMany({
            orderBy: [
                { anio_ingreso: 'desc' }, // Primero ordenar por el año en orden descendente
                { orden: 'asc' }  // Ordenar por el campo 'orden' en orden ascendente
            ]
        });

        // Convertir los valores de BigInt a String o a un tipo de dato compatible
        const delegacionesJSON = delegaciones.map(delegacion => ({
            ...delegacion,
            numero_investigacion_previa: delegacion.numero_investigacion_previa !== null ? delegacion.numero_investigacion_previa.toString() : null,
            // Si hay otros valores BigInt, conviértelos aquí de manera similar
        }));

        res.status(200).json(delegacionesJSON);
    } catch (error) {
        // Si hay algún error, envía una respuesta de error
        console.error('Error, listar delegaciones:', error);
        res.status(500).send('Error, listar delegaciones');
    }
};


