import bcrypt from 'bcrypt';

export const Password = () => {
    const longitud = 10; // Longitud de la contraseña aleatoria
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos para la contraseña
    let password = '';
  
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length); // Genera un índice aleatorio
      password += caracteres.charAt(indice); // Agrega el carácter correspondiente al índice generado
    }
  
    return password;
  };

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
