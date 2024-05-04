import { PrismaClient } from '@prisma/client';
import { VDToken } from '../helpers/crearJWT.js';


const prisma = new PrismaClient();

export const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Se requiere un token de autorización' });
        }

        const token = authorizationHeader.split(' ').pop(); // Se obtiene el token de la cabecera de autorización
        const tokenData = await VDToken(token, process.env.JWT_SECRET); // Se verifica el token
        
        const userData = await prisma.usuario.findUnique({ // Se busca al usuario en la base de datos utilizando su ID
            where: {
                id: tokenData.id
            },
            select: {
                Rol: true
            }
        });

        if ([].concat(roles).includes(userData.Rol)) { // Se verifica si el rol del usuario coincide con alguno de los roles permitidos
            next(); // Se permite que la solicitud continúe
        } else {
            res.status(403).json({ error: 'No tienes permisos' }); // Se devuelve un error de permisos si el usuario no tiene el rol adecuado
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Formato de token invalido' }); // Se devuelve un error interno del servidor en caso de excepción
    }
};
