import { check } from 'express-validator'
import { validacionResultado } from '../middlewares/validacionResultado.js'

export const loginVU = [
    check('email')
        .exists().withMessage('El correo electrónico es obligatorio')
        .notEmpty().withMessage('El correo electrónico no puede estar vacío')
        .custom(value => {
            // Verificar si el correo electrónico tiene el formato correcto usando una expresión regular
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) {
                throw new Error('El correo electrónico no es una dirección de correo electrónico válida');
            }
            return true;
        })
        .customSanitizer(value => value?.trim()),
  
    check('password')
        .exists().withMessage('La contraseña es obligatoria')
        .notEmpty().withMessage('Es necesario ingresar su contraseña')
        .customSanitizer(value => value?.trim()),
  
    (req, res, next) => {
      validacionResultado(req, res, next)
    }
];

export const solicitudRegistroVU = [
    check('cedula')  
    .exists().withMessage('La cedula es obligatoria')
    .notEmpty().withMessage('La cedula no puede estar vacía')      
    .isLength({ min: 10, max: 10 }).withMessage('La cedula debe de contener 10 números')
    .isNumeric().withMessage('La cedula debe de contener solo números')
    .customSanitizer(value => typeof value === 'number' ? String(value).trim() : value),


    check('nombre')  
    .exists().withMessage('El nombre es obligatorio')
    .notEmpty().withMessage('El nombre no puede estar vacío')      
    .isLength({ min: 7, max: 100 }).withMessage('El nombre debe contener al menos 7 caracteres')
    .customSanitizer(value => value?.trim()),

    check('email')  
    .exists().withMessage('El correo electrónico es obligatorio')
    .notEmpty().withMessage('El correo electrónico no puede estar vacío')     
    .custom(value => {
        // Verificar si el correo electrónico tiene el formato correcto usando una expresión regular
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) {
            throw new Error('El correo electrónico no es una dirección de correo electrónico válida');
        }
        return true;
    })
    .customSanitizer(value => value?.trim()),

    check('mensaje')  
    .exists().withMessage('El mensaje es obligatorio')
    .notEmpty().withMessage('El mensaje no puede estar vacío')      
    .customSanitizer(value => value?.trim()),

    (req, res, next) => {
        validacionResultado(req, res, next)
    }
];

export const X = [

];
export const Y = [

];
export const Zz = [

];
export const Z = [

];