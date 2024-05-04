import jwt from "jsonwebtoken";

export const generarJWT = (id, Rol) => {
    return jwt.sign({ id, Rol }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export const verificarToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        const e = new Error("Formato del token no válido");
        return res.status(404).json({ msg: e.message });
    }
}

