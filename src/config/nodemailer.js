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

export const sendMailToAdmin = async (cedula, email, nombreUsuario, mensaje) => {
    try {
        let mailOptions = {
            from: process.env.USER_MAILTRAP,
            to: process.env.ADMIN_EMAIL,
            subject: "Solicitud de Registro",
            html: `<!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Solicitud de Registro</title>
              <style>
                /* Estilos CSS aquí */
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Solicitud de Registro</h2>
                </div>
                <div class="content">
                  <div class="info">
                    <p>Se ha solicitado registrar un nuevo usuario con los siguientes detalles:</p>
                    <p><strong>Cédula:</strong> ${cedula}</p>
                    <p><strong>Correo Electrónico:</strong> ${email}</p>
                    <p><strong>Nombre de Usuario:</strong> ${nombreUsuario}</p>
                    <p><strong>Mensaje:</strong> ${mensaje}</p>
                  </div>
                </div>
                <div class="footer">
                  <p>Este correo electrónico fue generado automáticamente. Por favor, no responda a este mensaje.</p>
                </div>
              </div>
            </body>
            </html>
        `
        };

        // Enviar el correo electrónico al administrador utilizando async/await
        let info = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado al administrador:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo electrónico al administrador:', error);
    }
};
