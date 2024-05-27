import { body, check } from 'express-validator'
import { validacionResultado } from '../middlewares/validacionResultado.js'

export const RegistroVD = [
    body('delito')
    .exists().withMessage('El delito es obligatoria')
    .notEmpty().withMessage('El delito no puede estar vacio')
    .isLength({ min: 5, max: 100 }).withMessage('El delito debe contener al menos 5 caracteres')
    .customSanitizer(value => value?.trim()),
  
    body('seccion')
        .exists().withMessage('La seccion es obligatoria')
        .notEmpty().withMessage('La seccion no puede estar vacio')
        .isLength({ min: 10, max: 100 }).withMessage('La seccion debe contener al menos 10 caracteres')
        .customSanitizer(value => value?.trim()),
  
    (req, res, next) => {
      validacionResultado(req, res, next)
    }
];
