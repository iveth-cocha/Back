import { body, check } from 'express-validator'
import {validacionResultado} from '../middlewares/validacionResultado.js'

export const RegistroAGV = [
    body('Direcion_Unidad')
    .exists().withMessage('La Direcion Unidad es obligatorio')
    .notEmpty().withMessage('La Direcion Unidad no puede estar vacío')
    .isLength({min: 8}).withMessage('La Direcion Unidad debe contener al menos 8 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Grado')
    .exists().withMessage('El Grado es obligatorio')
    .notEmpty().withMessage('El Grado no puede estar vacío')
    .isLength({min: 5, max:5}).withMessage('El Grado debe contener 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Apellido_Nombre')
    .exists().withMessage('Los nombres y apellidos son obligatorios')
    .notEmpty().withMessage('Los nombres y apellidos no pueden estar vacío')
    .isLength({min: 10}).withMessage('Los nombres y apellidos debe contener al menos 10 caracteres')
    .customSanitizer(value => value?.trim()),

    check('Cedula')  
    .exists().withMessage('La cedula es obligatoria')
    .notEmpty().withMessage('La cedula no puede estar vacía')      
    .isLength({ min: 10, max: 10 }).withMessage('La cedula debe de contener 10 números')
    .isNumeric().withMessage('La cedula debe de contener solo números')
    .customSanitizer(value => typeof value === 'number' ? String(value).trim() : value),

    body('Zona')
    .exists().withMessage('La zona es obligatoria')
    .notEmpty().withMessage('La zona no puede estar vacía')
    .isLength({min: 6}).withMessage('La zona debe contener al menos 6 caracteres')
    .customSanitizer(value => value?.trim()),

    body('SubZona')
    .exists().withMessage('La sub-zona es obligatoria')
    .notEmpty().withMessage('La sub-zona no puede estar vacía')
    .isLength({min: 3, max:3}).withMessage('La sub-zona debe contener 3 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Distrito_Canton')
    .exists().withMessage('El distrito y canton son obligatorios')
    .notEmpty().withMessage('El distrito y canton no puede estar vacía')
    .isLength({min: 6}).withMessage('La zona debe contener al menos 6 caracteres')
    .customSanitizer(value => value?.trim()),

    body('PaseDNTH')
    .exists().withMessage('El campo Pase DNTH es obligatorio')
    .notEmpty().withMessage('El campo Pase DNTH no puede estar vacío')
    .isLength({min: 20}).withMessage('El campo Pase DNTH debe de contener al menos 20 caracteres')
    .customSanitizer(value => value?.trim()),


    body('Funcion')
    .exists().withMessage('El campo función es obligatorio')
    .notEmpty().withMessage('El campo función no puede estar vacío')
    .isLength({min: 20}).withMessage('El campo función debe de contener al menos 20 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Titulo')
    .exists().withMessage('El campo titulo es obligatorio')
    .notEmpty().withMessage('El campo titulo no puede estar vacío')
    .isLength({min: 7}).withMessage('El campo titulo debe de contener al menos 7 caracteres')
    .customSanitizer(value => value?.trim()),

    body('IdiomaExtranjero')
    .exists().withMessage('El campo idioma extranjero es obligatorio')
    .notEmpty().withMessage('El campo idioma extranjero no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo idioma extrangero debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Licencia')
    .isLength({min: 1}).withMessage('El campo licencia debe de contener al menos 1 caracter')
    .customSanitizer(value => value?.trim()),

    body('Residencia')
    .exists().withMessage('El campo recidencia es obligatorio')
    .notEmpty().withMessage('El campo recidencia no puede estar vacío')
    .isLength({min: 8}).withMessage('El campo recidencia debe de contener al menos 8 caracteres')
    .customSanitizer(value => value?.trim()),


    body('Estado_Civil')
    .exists().withMessage('El campo estado civil es obligatorio')
    .notEmpty().withMessage('El campo estado civil no puede estar vacío')
    .isLength({min: 7}).withMessage('El campo estado civil debe de contener al menos 7 caracteres')
    .customSanitizer(value => value?.trim()),


    body('FechaNacimiento')
    .exists().withMessage('El campo fecha de nacimiento es obligatorio')
    .notEmpty().withMessage('El campo fecha de nacimiento no puede estar vacío')
    .isLength({min: 10}).withMessage('El campo fecha de nacimiento debe de contener al menos 10 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Genero')
    .exists().withMessage('El campo género es obligatorio')
    .notEmpty().withMessage('El campo género no puede estar vacío')
    .isLength({min: 8}).withMessage('El campo género debe de contener al menos 8 caracteres')
    .customSanitizer(value => value?.trim()),

    check('Telefono')  
    .exists().withMessage('El campo telefono es obligatorio')
    .notEmpty().withMessage('El campo telefono no puede estar vacío')      
    .isLength({ min: 10, max: 10 }).withMessage('El campo telefono debe de contener 10 números')
    .isNumeric().withMessage('El campo telefono debe de contener solo números')
    .customSanitizer(value => typeof value === 'number' ? String(value).trim() : value),

    body('Email')
    .exists().withMessage('El campo correo electrónico es obligatorio')
    .notEmpty().withMessage('El campo correo electrónico no puede estar vacío')     
    .custom(value => {
        // Verificar si el correo electrónico tiene el formato correcto usando una expresión regular
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) {
            throw new Error('El campo correo electrónico no es una dirección de correo electrónico válida');
        }
        return true;
    })
    .customSanitizer(value => value?.trim()),

    body('NombresFamiliar')
    .exists().withMessage('El campo nombre del familiar es obligatorio')
    .notEmpty().withMessage('El campo nombre del familiar no puede estar vacío')
    .isLength({min: 6}).withMessage('El campo nombre del familiar debe de contener al menos 6 caracteres')
    .customSanitizer(value => value?.trim()),

    body('Parentesco')
    .exists().withMessage('El campo parentesco es obligatorio')
    .notEmpty().withMessage('El campo parentesco no puede estar vacío')
    .isLength({min: 5}).withMessage('El campo parentesco debe de contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),

    check('TelefonoFamiliar')  
    .exists().withMessage('El campo telefono familiar es obligatorio')
    .notEmpty().withMessage('El campo telefono familiar no puede estar vacío')      
    .isLength({ min: 7}).withMessage('El campo telefono familiar debe de contener al menos 7 números')
    .isNumeric().withMessage('El campo telefono familiar debe de contener solo números')
    .customSanitizer(value => typeof value === 'number' ? String(value).trim() : value),

    check('Terno')  
    .exists().withMessage('El campo terno es obligatorio')
    .notEmpty().withMessage('El campo terno no puede estar vacío')      
    .isLength({ min: 2, max: 2 }).withMessage('El campo terno debe de contener 2 números')
    .isNumeric().withMessage('El campo terno debe de contener solo números'),

    check('Camisa')  
    .exists().withMessage('El campo camisa es obligatorio')
    .notEmpty().withMessage('El campo camisa no puede estar vacío')      
    .isLength({ min: 2, max: 2 }).withMessage('El campo camisa debe de contener 2 números')
    .isNumeric().withMessage('El campo camisa debe de contener solo números'),

    check('Calzado')  
    .exists().withMessage('El campo calzado es obligatorio')
    .notEmpty().withMessage('El campo calzado no puede estar vacío')      
    .isLength({ min: 2, max: 2 }).withMessage('El campo calzado debe de contener 2 números')
    .isNumeric().withMessage('El campo calzado debe de contener solo números'),

    check('Cabeza')  
    .exists().withMessage('El campo cabeza es obligatorio')
    .notEmpty().withMessage('El campo cabeza no puede estar vacío')      
    .isLength({ min: 2, max: 2 }).withMessage('El campo cabeza debe de contener 2 números')
    .isNumeric().withMessage('El campo cabeza debe de contener solo números'),

    (req, res, next) => {
        validacionResultado(req, res, next)
    }

]
