import { body, check } from 'express-validator'
import { validacionResultado } from '../middlewares/validacionResultado.js'

export const ActualizacionDV = [

    body('apellidos_nombres_victima')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio y pueda estar vacio
        .isLength({ min: 7 }).withMessage('El campo apellidos y nombres de la victima debe de contener al menos 7 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo apellidos y nombres de la victima solo puede contener letras, comas y espacios')
        .customSanitizer(value => value?.trim()),

    //==========Ver bien desde aqui ===========

    body('edad_victima')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 2, max: 2 }).withMessage('El campo sexo de la victima debe de contener 2 números')
        .isNumeric().withMessage('El campo edad de la victima debe contener solo números'),

    body('apellidos_nombres_sospechoso')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 5 }).withMessage('El campo apellidos y nombres del sospechoso debe de contener al menos 5 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo apellidos y nombres del sospechoso solo puede contener letras, comas y espacios')
        .customSanitizer(value => value?.trim()),

    body('condicion_infractor_involucrado')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 5 }).withMessage('El campo condicion del involucrado debe de contener al menos 5 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo condicion del involucrado solo acepta letras, comas y espacios')
        .customSanitizer(value => value?.trim()),

    body('parentesco_detenido_sospechoso_victima')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 5 }).withMessage('El campo parentesco del sospechoso con la victima debe de contener al menos 5 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo parentesco del sospechoso con la victima solo puede contener letras, comas y espacios')
        .customSanitizer(value => value?.trim()),

    body('alias_sospechoso')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 5 }).withMessage('El campo alias del sospechoso debe de contener al menos 5 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo alias del sospechoso solp puede contener letras, comas y espacios')
        .customSanitizer(value => value?.trim()),

    body('placa_vehiculo_involucrado')/*--------------------*/
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 8, max: 8 }).withMessage('El campo placas del vehiculo involucrado debe de contener 8 caracteres')
        .matches(/^[A-Za-z0-9-]*$/).withMessage('El campo placas del vehiculo involucrado solo puede contener letras, guines y números')
        .customSanitizer(value => value?.trim()),

    body('plazo_otorgado_dias')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 1, max: 2 }).withMessage('El campo plazo otrogado debe de contener entre uno y dos números')
        .isNumeric().withMessage('El campo plazo otrogado debe contener solo números'),

    body('numero_articulo')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .matches(/^[0-9,\s]+$/).withMessage('El campo número de artículos cumplidos debe contener solo números y comas')
        .customSanitizer(value => value?.trim()),

    //Desde aqui se llena despues
    body('articulos_cumplidos')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .matches(/^[0-9,\s]+$/).withMessage('El campo número de artículos cumplidos debe contener solo números y comas')
        .customSanitizer(value => value?.trim()),

    body('numero_oficio_descargo')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 23 }).withMessage('El campo número de oficio de descargo debe de contener al menos 23 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo número de oficio de descargo solo acepta letras, comas y espacios')
        .customSanitizer(value => value?.trim()),

    body('versiones')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .isLength({ min: 1, max: 2 }).withMessage('El campo versiones debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo versiones debe contener solo números'),

    body('reconocimientos_lugar_hechos')
        .optional({ checkFalsy: true }) // Hace que el campo no sea obligatorio
        .matches(/^[A-Za-z0-9,\s]+$/).withMessage('El campo reconocimientos del lugar de los hechos debe contener solo letras, números y comas')
        .customSanitizer(value => value?.trim()),

    body('apellidos_nombres_detenidos_producto')
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo apellidos y nombres de los detenidos producto del cumplimiento de la disposición fiscal solo puede contener letras y comas')
        .customSanitizer(value => value?.trim()),

    body('no_boletas_solicitadas')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de boletas solicitadas debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de boletas solicitadas debe contener solo números'),

    body('no_detenidos_producto_investigacion')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de detenidos producto de la investigación debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de detenidos producto de la investigación debe contener solo números'),

    body('allanamientos_numero')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de allanamientos debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de allanamientos debe contener solo números'),

    body('recuperacion_bienes_evidencias')
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-z0-9,\s-]*$/).withMessage('El campo número de recuperación de bienes debe contener solo letras, números, comas y guiones')
        .customSanitizer(value => value?.trim()),

    body('recuperacion_automotores')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de recuperación de automotores debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de recuperación de automotores debe contener solo números'),

    body('recuperacion_otros')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de recuperación de otros debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de recuperación de otros debe contener solo números'),

    body('notificaciones')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de notificaciones debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de notificaciones debe contener solo números'),

    body('citaciones')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de citaciones debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de citaciones debe contener solo números'),

    body('peritajes')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de peritajes debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de peritajes debe contener solo números'),

    body('traslados')
        .optional({ checkFalsy: true })
        .isLength({ min: 1, max: 2 }).withMessage('El campo número de traslados debe de contener entre 1 y 2 números')
        .isNumeric().withMessage('El campo número de traslados debe contener solo números'),

    body('causas_incumplimiento_investigacion')
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo causas de incumplimiento de la investigación solo puede contener letras y comas')
        .customSanitizer(value => value?.trim()),

    body('nombre_detenidos_producto_investigacion')
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo nombre de detenidos producto de la investigación solo puede contener letras y comas')
        .customSanitizer(value => value?.trim()),

    body('observaciones')
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-z0-9\s]*$/).withMessage('El campo observaciones solo puede contener letras y números')
        .customSanitizer(value => value?.trim()),

    body('cantidad_sustraida')
        .optional({ checkFalsy: true })
        .matches(/^[0-9,]*$/).withMessage('El campo cantidad sustraída solo puede contener números y comas')
        .customSanitizer(value => value?.trim()),

    body('entidad_financiera')
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,]*$/).withMessage('El campo entidad financiera solo puede contener letras y comas')
        .customSanitizer(value => value?.trim()),

    (req, res, next) => {
        validacionResultado(req, res, next);
    }
]

