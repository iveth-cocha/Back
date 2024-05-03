import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const verificarAdmin = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    const { authorization } = req.headers;

    try {
        const { id, Rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);

        if (Rol === "Administrador") {
            const usuarioBDD = await prisma.usuario.findUnique({
                where: {
                    id: parseInt(id)
                },
                select: {
                    id: true,
                }
            });

            if (!usuarioBDD) {
                return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
            }

            req.usuarioBDD = usuarioBDD;
            next();
        } else {
            return res.status(401).json({ msg: "Lo sentimos, no tienes permisos para acceder a esta ruta" });
        }
    } catch (error) {
        const e = new Error("Formato del token no válido");
        return res.status(404).json({ msg: e.message });
    }
};

export const verificarRegistrador = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    const { authorization } = req.headers;

    try {
        const { id, Rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);

        if (Rol === "REGISTRADOR") {
            const usuarioBDD = await prisma.usuario.findUnique({
                where: {
                    id: parseInt(id)
                },
                select: {
                    id: true,
                    nombre: true,
                    email: true // Ajusta los campos que deseas seleccionar
                    // Otros campos que deseas seleccionar
                }
            });

            if (!usuarioBDD) {
                return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
            }

            req.usuarioBDD = usuarioBDD;
            next();
        } else {
            return res.status(401).json({ msg: "Lo sentimos, no tienes permisos para acceder a esta ruta" });
        }
    } catch (error) {
        const e = new Error("Formato del token no válido");
        return res.status(404).json({ msg: e.message });
    }
};

export const verificarVisualizador = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    const { authorization } = req.headers;

    try {
        const { id, Rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);

        if (Rol === "VISUALIZADOR") {
            const usuarioBDD = await prisma.usuario.findUnique({
                where: {
                    id: parseInt(id)
                },
                select: {
                    id: true,
                    nombre: true,
                    email: true // Ajusta los campos que deseas seleccionar
                    // Otros campos que deseas seleccionar
                }
            });

            if (!usuarioBDD) {
                return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
            }

            req.usuarioBDD = usuarioBDD;
            next();
        } else {
            return res.status(401).json({ msg: "Lo sentimos, no tienes permisos para acceder a esta ruta" });
        }
    } catch (error) {
        const e = new Error("Formato del token no válido");
        return res.status(404).json({ msg: e.message });
    }
};