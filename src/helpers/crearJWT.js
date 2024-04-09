import jwt from "jsonwebtoken";

export const generarJWT = (id,Rol)=>{
    return jwt.sign({id,Rol},process.env.JWT_SECRET,{expiresIn:"1d"})
}
