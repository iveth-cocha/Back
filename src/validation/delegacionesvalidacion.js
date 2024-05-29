import { body, check } from 'express-validator'
import {validacionResultado} from '../middlewares/validacionResultado.js'

export const RegistroDV = [
    body('numero_investigacion_previa')
    .if((value, { req }) => req.body.numero_instruccion_fiscal === undefined || req.body.numero_instruccion_fiscal.trim() === '')
    .exists().withMessage('El campo numero investigacion previa es obligatorio si el campo numero instruccion fiscal está vacío')
    .bail() // Detiene las siguientes validaciones si la anterior falla
    .notEmpty().withMessage('El campo numero investigacion previa no puede estar vacío'),
    body('numero_investigacion_previa')
    .optional() // Asegura que las siguientes validaciones se apliquen si el campo está presente
    .isNumeric().withMessage('El campo numero investigacion previa debe de contener solo números')
    .isLength({ min: 15, max: 15 }).withMessage('El campo numero investigacion previa debe de contener 15 números')
    .customSanitizer(value => typeof value === 'string' ? value.trim() : value),

    body('numero_instruccion_fiscal')
    .if((value, { req }) => req.body.numero_investigacion_previa === undefined || req.body.numero_investigacion_previa.trim() === '')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio si el campo numero investigacion previa está vacío')
    .bail() // Detiene las siguientes validaciones si la anterior falla
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío'),
    body('numero_instruccion_fiscal')
    .optional() // Asegura que las siguientes validaciones se apliquen si el campo está presente
    .isLength({ min: 5 }).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    // Validación personalizada para asegurar que al menos uno de los dos campos esté lleno
    body().custom((value, { req }) => {
        if (!req.body.numero_investigacion_previa && !req.body.numero_instruccion_fiscal) {
            throw new Error('Al menos uno de los campos numero investigacion previa o numero instruccion fiscal debe estar lleno');
        }
        return true;
    }),

    body('zona')
    .exists().withMessage('El campo zona es obligatorio')
    .notEmpty().withMessage('El campo zona no puede estar vacío')
    .customSanitizer(value => value?.trim()),

    body('provincia')
    .exists().withMessage('El campo provincia es obligatorio')
    .notEmpty().withMessage('El campo provincia no puede estar vacío')
    .customSanitizer(value => value?.trim()),

    body('canton')
    .exists().withMessage('El campo canton es obligatorio')
    .notEmpty().withMessage('El campo canton no puede estar vacío')
    .customSanitizer(value => value?.trim()),

    body('cod_distrito')
    .exists().withMessage('El campo cod_distrito es obligatorio')
    .notEmpty().withMessage('El campo cod_distrito no puede estar vacío')
    .customSanitizer(value => value?.trim()),

    body('distrito')
    .exists().withMessage('El campo distrito es obligatorio')
    .notEmpty().withMessage('El campo distrito no puede estar vacío')
    .customSanitizer(value => value?.trim()),

    body('apellidos_nombres_agente')
    .exists().withMessage('El campo apellidos y nombres del agente es obligatorio')
    .notEmpty().withMessage('El campo apellidos y nombres del agente no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo apellidos y nombres del agente debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo apellidos y nombres del agente no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('tipo_delito') //OJO
    .exists().withMessage('El campo tipo de delito es obligatorio')
    .notEmpty().withMessage('El campotipo de delito no puede estar vacío')
    .isLength({min: 4}).withMessage('El campo tipo de delito debe de contener al menos 4 caracteres')
    .customSanitizer(value => value?.trim()),

    body('fecha_infraccion_delito')
    .exists().withMessage('El campo fecha de la infracción o delito es obligatorio')
    .notEmpty().withMessage('El campo fecha de la infracción o delito no puede estar vacío')
    .isLength({min: 10, max:10}).withMessage('El campo fecha de la infracción o delito debe de contener 10 caracteres')
    .customSanitizer(value => value?.trim()),

    body('apellidos_nombres_victima')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo apellidos y nombres de la victima no puede estar vacío')
    .isLength({ min: 7 }).withMessage('El campo apellidos y nombres de la victima debe de contener al menos 7 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo apellidos y nombres de la victima no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('sexo_victima')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo sexo de la victima no puede estar vacío')
    .customSanitizer(value => value?.trim()),

    body('edad_victima')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo sexo de la victima no puede estar vacío')
    .isLength({min: 2, max:2}).withMessage('El campo sexo de la victima debe de contener 2 números')
    .isNumeric().withMessage('El campo edad de la victima debe contener solo números'),

    body('apellidos_nombres_sospechoso')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo apellidos y nombres del sospechoso no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo apellidos y nombres del sospechoso debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo apellidos y nombres del sospechoso no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('condicion_infractor_involucrado')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo condicion del involucrado no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo condicion del involucrado debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo condicion del involucrado no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('parentesco_detenido_sospechoso_victima')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo parentesco del sospechoso con la victima no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo parentesco del sospechoso con la victima debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo parentesco del sospechoso con la victima no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('parentesco_detenido_sospechoso_victima')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo parentesco del sospechoso con la victima no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo parentesco del sospechoso con la victima debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo parentesco del sospechoso con la victima no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('alias_sospechoso')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo alias del sospechoso no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo alias del sospechoso debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo alias del sospechoso no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('placa_vehiculo_involucrado')/*--------------------*/
    .if((value, { req }) => value !== null && value.trim() !== '') // Aplicar validaciones solo si el valor no es null ni una cadena que contenga solo espacios en blanco
    .isLength({ min: 7, max: 7 }).withMessage('El campo placas del vehiculo involucrado debe de contener 7 caracteres')
    .customSanitizer(value => value?.trim()),

    body('apellidos_nombres_fiscal')
    .exists().withMessage('El campo apellidos y nombres del fiscal es obligatorio')
    .notEmpty().withMessage('El campo apellidos y nombres del fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo apellidos y nombres del fiscal debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo apellidos y nombres del fiscal no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('unidad_especializada')
    .exists().withMessage('El campo unidad especializada de fiscalia es obligatorio')
    .notEmpty().withMessage('El campo unidad especializada de fiscalia no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo  unidad especializada de fiscalia debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('fecha_delegacion')
    .exists().withMessage('El campo fecha de la delegación es obligatorio')
    .notEmpty().withMessage('El campo fecha de la delegación no puede estar vacío')
    .isLength({min: 10, max:10}).withMessage('El campo  fecha de la delegación debe de contener 10 caracteres')
    .customSanitizer(value => value?.trim()),

    body('fecha_recepcion_pj')
    .exists().withMessage('El campo fecha de recepción en PJ es obligatorio')
    .notEmpty().withMessage('El campo fecha de recepción en PJ no puede estar vacío')
    .isLength({min: 10, max:10}).withMessage('El campo fecha de recepción en PJ debe de contener 10 caracteres')
    .customSanitizer(value => value?.trim()),

    body('fecha_recepcion_agente_investigador')
    .exists().withMessage('El campo fecha de recepción por parte del agente es obligatorio')
    .notEmpty().withMessage('El campo fecha de recepción por parte del agente no puede estar vacío')
    .isLength({min: 10, max:10}).withMessage('El campo fecha de recepción por parte del agente debe de contener 10 caracteres')
    .customSanitizer(value => value?.trim()),

    body('no_oficio_recibe_diligencia')
    .exists().withMessage('El campo número de oficio con la que recibe la diligencia el agente es obligatorio')
    .notEmpty().withMessage('El campo número de oficio con la que recibe la diligencia el agente no puede estar vacío')
    .isLength({min: 20}).withMessage('El campo número de oficio con la que recibe la diligencia el agente debe de contener al menos 20 caracteres')
    .customSanitizer(value => value?.trim()),

    body('plazo_otorgado_dias')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo plazo otrogado de la victima no puede estar vacío')
    .isLength({min: 2, max:2}).withMessage('El campo plazo otrogado debe de contener 2 números')
    .isNumeric().withMessage('El campo plazo otrogado debe contener solo números'),

    body('numero_articulo')
    .exists().withMessage('El campo número de artículo COIP es obligatorio')
    .notEmpty().withMessage('El campo número de artículo COIP no puede estar vacío')
    .matches(/^[0-9,]+$/).withMessage('El campo número de artículo COIP debe contener solo números y comas')
    .customSanitizer(value => value?.trim()),

    //Desde aqui se llena despues
    body('numero_articulo')
    .optional() // Hace que el campo no sea obligatorio
    .notEmpty().withMessage('El campo número de artículos cumplidos no puede estar vacío')
    .matches(/^[0-9,]+$/).withMessage('El campo número de artículos cumplidos debe contener solo números y comas')
    .customSanitizer(value => value?.trim()),

    body('numero_oficio_descargo')
    .exists().withMessage('El campo número de oficio de descargo es obligatorio')
    .notEmpty().withMessage('El campo número de oficio  de descargo no puede estar vacío')
    .isLength({min: 20}).withMessage('El campo número de oficio de descargo debe de contener al menos 20 caracteres')
    .customSanitizer(value => value?.trim()),

    body('versiones')
    .if((value, { req }) => value !== null) // Aplicar validaciones solo si el valor no es null
    .notEmpty().withMessage('El campo versiones no puede estar vacío')
    .isLength({min: 1, max:2}).withMessage('El campo versiones debe de contener entre 1 y 2 números')
    .isNumeric().withMessage('El campo versiones debe contener solo números'),

    body('reconocimientos_lugar_hechos')
    .if((value, { req }) => value !== null) // Aplicar validaciones solo si el valor no es null
    .notEmpty().withMessage('El campo reconocimiento del lugar de los hechos no puede estar vacío')
    .isLength({ min: 1, max:2 }).withMessage('El campo reconocimiento del lugar de los hechos debe de contener entre 1 y 2 números')
    .isNumeric().withMessage('El campo reconocimiento del lugar de los hechos debe contener solo números'),

    body('no_boletas_solicitadas')/*----------------------*/
    .if((value, { req }) => value !== null) // Aplicar validaciones solo si el valor no es null
    .notEmpty().withMessage('El campo numero de boleta no puede estar vacío')
    .isLength({ min: 1, max:3 }).withMessage('El campo numero de boleta debe de contener entre 1 y 3 números')
    .isNumeric().withMessage('El campo numero de boleta debe contener solo números'),


    (req, res, next) => {
        validacionResultado(req, res, next);
    }
]