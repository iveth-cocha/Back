import jwt from "jsonwebtoken";

export const generarJWT = (id, Rol) => {
    return jwt.sign({ id, Rol }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export const VDToken = async (token, options = {}) => {
    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, options);
        
        // Retornar el contenido decodificado del token
        return decodedToken;
    } catch (error) {
        // Manejar errores de verificación de token (puede ser una firma inválida, token expirado, etc.)
        console.error('Error al verificar el token:', error.message);
        throw new Error('Formato del token no válido'); // O puedes lanzar una excepción, dependiendo de tus necesidades
    }
}
