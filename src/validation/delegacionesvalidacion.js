import { body, check } from 'express-validator'
import {validacionResultado} from '../middlewares/validacionResultado.js'

export const RegistroDV = [
    body('Direcion_Unidad')
    .exists().withMessage('La Direcion Unidad es obligatorio')
    .notEmpty().withMessage('La Direcion Unidad no puede estar vacío')
    .isLength({min: 8}).withMessage('La Direcion Unidad debe contener al menos 8 caracteres')
    .matches(/^[^0-9]*$/).withMessage('La Direcion Unidad no puede contener números')
    .customSanitizer(value => value?.trim()),

    check('numero_investigacion_previa')  
    .exists().withMessage('El campo numero investigacion previa es obligatorio')
    .notEmpty().withMessage('El campo numero investigacion previa no puede estar vacío')   
    .isNumeric().withMessage('El campo numero investigacion previa debe de contener solo números')   
    .isLength({min: 15, max: 15}).withMessage('El campo cabeza debe de contener 15 números'),

    body('numero_instruccion_fiscal')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('apellidos_nombres_agente')
    .exists().withMessage('El campo apellidos nombres agente es obligatorio')
    .notEmpty().withMessage('El campo apellidos nombres agente no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo apellidos nombres agente debe de contener al menos 5 caracteres')
    .matches(/^[^0-9]*$/).withMessage('El campo apellidos nombres agente no puede contener números')
    .customSanitizer(value => value?.trim()),

    body('tipo_delito')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('numero_instruccion_fiscal')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('numero_instruccion_fiscal')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('numero_instruccion_fiscal')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('numero_instruccion_fiscal')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('numero_instruccion_fiscal')
    .exists().withMessage('El campo numero instruccion fiscal es obligatorio')
    .notEmpty().withMessage('El campo numero instruccion fiscal no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo numero instruccion fiscal debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),
]