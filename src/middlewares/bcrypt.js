import bcrypt from 'bcrypt';

export const encrypPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    return passwordEncrypted;
}

export const matchPassword = async (password, hashedPassword) => {
    const response = await bcrypt.compare(password, hashedPassword);
    return response;
}

export const crearToken  = () => {
    const tokenGenerated = Math.random().toString(36).slice(2);
    return tokenGenerated;
}

export const crearTokenSession = () => {
    let tokenGenerated = '';
    for (let i = 0; i < 5; i++) {
      tokenGenerated += Math.random().toString(36).slice(2);
    }
    return tokenGenerated;
}