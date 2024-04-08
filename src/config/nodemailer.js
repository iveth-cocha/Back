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
            subject: "Verifica tu cuenta y tu contraseña temporal",
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

export default sendMailToUser;
