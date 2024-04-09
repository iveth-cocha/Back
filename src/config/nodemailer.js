import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    },
});

export const sendMailToUser = async (email, token, passwordRandom) => {
    try {
        // Construir el enlace de confirmación con el token y la contraseña aleatoria
        const confirmationLink = `${process.env.URL_BACKEND}confirmar/${encodeURIComponent(token)}`;

        let mailOptions = {
            from: process.env.USER_MAILTRAP,
            to: email,
            subject: "Verificación de Correo y Contraseña",
            html: `<p>Hola, haz clic <a href="${confirmationLink}">aquí</a> para confirmar tu cuenta. <br> 
            Tu contraseña temporal es: ${passwordRandom}. Úsala para acceder a tu cuenta. No olvides cambiarla después.</p>`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            } else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

export const sendMailToRecoveryPassword = async (email, token) => {
    try {
        // Construir el enlace de recuperación de contraseña con el token
        const recoveryLink = `${process.env.URL_BACKEND}verificar-password/${token}`;

        let mailOptions = {
            from: process.env.USER_MAILTRAP,
            to: email,
            subject: "Correo para reestablecer tu contraseña",
            html: `
                <h1>Sistema de delegaciones (Ciberpol )</h1>
                <hr>
                <a href="${recoveryLink}">Haz clic aquí para reestablecer tu contraseña</a>
                <hr>
                <footer>Ciberpol S.A!</footer>
            `
        };

        // Enviar el correo electrónico utilizando async/await
        let info = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

