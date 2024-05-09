import { check } from 'express-validator'
import { validacionResultado } from '../middlewares/validacionResultado.js'

export const loginVU = [
    check('email')
      .notEmpty().withMessage('El correo electrónico no puede estar vacío')
      .isEmail().withMessage('El correo electrónico no es una dirección de correo electrónico válida')
      .customSanitizer(value => value?.trim()),
  
    check('password')
      .notEmpty().withMessage('Es necesario ingresar su contraseña')
      .customSanitizer(value => value?.trim()),
  
    (req, res, next) => {
      validacionResultado(req, res, next)
    }
];
  export const solicitudRegistroVU = [

  ];
