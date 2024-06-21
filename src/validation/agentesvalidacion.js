import { body, check } from 'express-validator';
import { validacionResultado } from '../middlewares/validacionResultado.js';

//===== Validaciones para campos obligatorios=====
const campoObligatorioExacto = (campo, longitud) => [
  body(campo)
    .exists().withMessage(`El campo ${campo} es obligatorio`)
    .notEmpty().withMessage(`El campo ${campo} no puede estar vacío`)
    .isLength({ min: longitud, max: longitud }).withMessage(`El campo ${campo} debe contener ${longitud} caracteres`)
    .trim()
];
const campoObligatorioExactoBoxGrad = (campo, longitud) => [
  body(campo)
    .exists().withMessage(`El campo ${campo} es obligatorio`)
    .notEmpty().withMessage(`El campo ${campo} no puede estar vacío`)
    .isLength({ min: longitud, max: longitud }).withMessage(`El campo ${campo} debe contener ${longitud} caracteres`)
    .trim()
];
const campoObligatorioExactoBoxGene = (campo, min, max) => [
  body(campo)
    .exists().withMessage(`El campo ${campo} es obligatorio`)
    .notEmpty().withMessage(`El campo ${campo} no puede estar vacío`)
    .isLength({ min, max }).withMessage(`El campo ${campo} debe contener entre ${min} y ${max} caracteres`)
    .trim()
];


const campoObligatorio = (campo, min, max) => [
  body(campo)
    .exists().withMessage(`El campo ${campo} es obligatorio`)
    .notEmpty().withMessage(`El campo ${campo} no puede estar vacío`)
    .isLength({ min, max }).withMessage(`El campo ${campo} debe contener entre ${min} y ${max} caracteres`)
    .trim()
];

const campoNumericoObligatorio = (campo, longitud) => [
  check(campo)
    .exists().withMessage(`El campo ${campo} es obligatorio`)
    .notEmpty().withMessage(`El campo ${campo} no puede estar vacío`)
    .isLength({ min: longitud, max: longitud }).withMessage(`El campo ${campo} debe contener ${longitud} números`)
    .isNumeric().withMessage(`El campo ${campo} debe contener solo números`)
    .trim()
];

const campoNumericoRangoObligatorio = (campo, min, max) => [
  check(campo)
    .exists().withMessage(`El campo ${campo} es obligatorio`)
    .notEmpty().withMessage(`El campo ${campo} no puede estar vacío`)
    .isLength({ min, max }).withMessage(`El campo ${campo} debe contener entre ${min} y ${max} números`)
    .isNumeric().withMessage(`El campo ${campo} debe contener solo números`)
    .trim()
];

//===== Validaciones para campos opcionales=====
const campoOptionalExacto = (campo, longitud) => [
  body(campo)
    .optional({ checkFalsy: true })
    .isLength({ min: longitud, max: longitud }).withMessage(`El campo ${campo} debe contener ${longitud} caracteres`)
    .trim()
];

const campoOptional = (campo, min, max) => [
  body(campo)
    .optional({ checkFalsy: true })
    .isLength({ min, max }).withMessage(`El campo ${campo} debe contener entre ${min} y ${max} caracteres`)
    .trim()
];

const campoNumericoOptional = (campo, longitud) => [
  check(campo)
    .optional({ checkFalsy: true })
    .isLength({ min: longitud, max: longitud }).withMessage(`El campo ${campo} debe contener ${longitud} números`)
    .isNumeric().withMessage(`El campo ${campo} debe contener solo números`)
    .trim()
];

const campoNumericoRangoOptional = (campo, min, max) => [
  check(campo)
    .optional({ checkFalsy: true })
    .isLength({ min, max }).withMessage(`El campo ${campo} debe contener entre ${min} y ${max} números`)
    .isNumeric().withMessage(`El campo ${campo} debe contener solo números`)
    .trim()
];

export const RegistroAGV = [
  ...campoObligatorio('Apellido_Nombre', 10, 100),
  ...campoObligatorioExactoBoxGrad('Grado', 5),
  ...campoNumericoObligatorio('Cedula', 10),
  ...campoObligatorio('PaseDNTH', 20, 100),
  ...campoObligatorio('Funcion', 20, 100),
  ...campoObligatorio('Titulo', 7, 100),
  ...campoObligatorio('IdiomaExtranjero', 5, 100),
  ...campoObligatorio('Residencia', 8, 100),
  ...campoObligatorio('Estado_Civil', 5, 100),
  ...campoObligatorio('FechaNacimiento', 10, 10),
  ...campoObligatorioExactoBoxGene('Genero', 8, 10),
  ...campoNumericoObligatorio('Telefono', 10),
  ...campoObligatorio('NombresFamiliar', 6, 100),
  ...campoObligatorio('Parentesco', 5, 100),
  ...campoNumericoRangoObligatorio('TelefonoFamiliar', 7, 10),
  ...campoNumericoObligatorio('Terno', 2),
  ...campoNumericoObligatorio('Camisa', 2),
  ...campoNumericoObligatorio('Calzado', 2),
  ...campoNumericoObligatorio('Cabeza', 2),

  ...campoOptional('Licencia', 1, 10),

  ...campoOptional('Novedad', 1, 100),
  ...campoOptional('Detalle', 1, 100),
  ...campoOptional('Documento', 1, 100),

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
    .trim(),

  (req, res, next) => {
    validacionResultado(req, res, next);
  }
];


export const ActualizarAGV = [
  ...campoObligatorio('Apellido_Nombre', 10, 100),
  ...campoObligatorioExactoBoxGrad('Grado', 5),
  ...campoNumericoObligatorio('Cedula', 10),
  ...campoObligatorio('PaseDNTH', 20, 100),
  ...campoObligatorio('Funcion', 20, 100),
  ...campoObligatorio('Titulo', 7, 100),
  ...campoObligatorio('IdiomaExtranjero', 5, 100),
  ...campoObligatorio('Residencia', 8, 100),
  ...campoObligatorio('Estado_Civil', 5, 100),
  ...campoObligatorio('FechaNacimiento', 10, 10),
  ...campoObligatorioExactoBoxGene('Genero', 8, 10),
  ...campoNumericoObligatorio('Telefono', 10),
  ...campoObligatorio('NombresFamiliar', 6, 100),
  ...campoObligatorio('Parentesco', 5, 100),
  ...campoNumericoRangoObligatorio('TelefonoFamiliar', 7, 10),
  ...campoNumericoObligatorio('Terno', 2),
  ...campoNumericoObligatorio('Camisa', 2),
  ...campoNumericoObligatorio('Calzado', 2),
  ...campoNumericoObligatorio('Cabeza', 2),

  ...campoOptional('Licencia', 1, 10),

  ...campoOptional('Novedad', 1, 100),
  ...campoOptional('Detalle', 1, 100),
  ...campoOptional('Documento', 1, 100),

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
    .trim(),

  (req, res, next) => {
    validacionResultado(req, res, next);
  }
];
