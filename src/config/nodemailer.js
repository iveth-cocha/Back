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

export const sendMailToUser = async (email, token) => {
    try {
        // Construir el enlace de confirmación con el token
        const confirmationLink = `${process.env.URL_BACKEND}confirmar/${encodeURIComponent(token)}`;

        let mailOptions = {
            from: process.env.USER_MAILTRAP,
            to: email,
            subject: "Verificación de Correo y Contraseña",
            html: `<p>Hola, haz clic <a href="${confirmationLink}">aquí</a> para confirmar tu cuenta. <br> 
            Recuerde que su contraseña es:"Cédula_Cib3rp0l**" . Por ejemplo: "1717171717_Cib3rp0l**".<br> 
            Úsela para acceder a su cuenta.</p>`
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

export const sendMailToResetPassword = async (email, token) => {
    try {
        // Construir el enlace de reestablecimiento de contraseña con el token
        const resetPasswordLink = `${process.env.URL_BACKEND}recuperar-password/${token}`;

        let mailOptions = {
            from: process.env.USER_MAILTRAP,
            to: email,
            subject: "Recuperación de Contraseña",
            html: `
                <h1>Recuperación de Contraseña</h1>
                <hr>
                <a href="${resetPasswordLink}">Haz clic aquí para reestablecer tu contraseña</a>
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

export const sendMailToAdmin = async (email, nombreUsuario) => {
    try {
        let mailOptions = {
            from: process.env.USER_MAILTRAP,
            to: process.env.ADMIN_EMAIL,
            subject: "Solicitud de Registro",
            html: `<p>Se solicita registrar un nuevo usuario con el correo electrónico ${email} y el nombre ${nombreUsuario}</p>`
        };

        // Enviar el correo electrónico al administrador utilizando async/await
        let info = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado al administrador:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo electrónico al administrador:', error);
    }
};
