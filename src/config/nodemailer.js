import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_GMAIL,
    port: process.env.PORT_GMAIL,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL,
    },
    tls: {
        rejectUnauthorized: false // Desactiva la verificación del certificado
    }
});

export const sendMailToUser = async (email, token) => {
    try {
        // Construir el enlace de confirmación con el token
        const confirmationLink = `${process.env.URL_BACKEND}confirmar/${encodeURIComponent(token)}`;

        //const confirmationLink = `${process.env.URL_FRONTEND}confirmar/${token}`;

        const mailOptions = {
            from: process.env.USER_GMAIL,
            to: email,
            subject: "Verificación de Correo y Contraseña",
            html: `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f5f5f5;
                                padding: 20px;
                            }
                    
                            .card {
                                background-image: url('https://i.ibb.co/NC31fhM/Plantilla.png');
                                background-size: cover;
                                background-repeat: no-repeat;
                                background-position: center;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                padding: 20px;
                                margin: 20px auto;
                                max-width: 600px;
                            }
                    
                            header {
                                color: #555;
                                /* Cambia el color del texto a gris */
                                text-align: center;
                                /* Centra el encabezado */
                                font-weight: bold;
                                font-family: Arial, sans-serif;
                                font-size: 24px;
                            }
                    
                            h3 {
                                color: #333;
                                text-align: center;
                            }
                    
                            p {
                                color: #555;
                                margin-left: 60px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                            }
                
                            .centro{
                                margin-left: 10px;
                            }
                    
                    
                            a.button {
                                display: block;
                                width: 150px;
                                margin: 20px auto;
                                /* Centrar el botón */
                                background-color: #153557;
                                color: #fff;
                                text-decoration: none;
                                text-align: center;
                                padding: 10px 20px;
                                border-radius: 5px;
                            }
                    
                            a.button:hover {
                                background-color: #0056b3;
                                /* Cambia el color al pasar el mouse */
                            }
                    
                            /* Asegura que la imagen de fondo no afecte el tamaño del contenido */
                            footer {
                                position: relative;
                            }
                    
                            footer img {
                                max-width: 100%;
                                /* Establece el ancho máximo de la imagen al 100% del contenedor */
                                margin-left: 20px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                                margin-right: 20px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                                height: auto;
                                /* Asegura que la altura se ajuste automáticamente según el ancho */
                            }
                        </style>
                    </head>
                    
                    <body>
                        <div class="card">
                            <br>
                            <header>UNIDAD NACIONAL DE CIBERDELITO</header>
                            <h3>Verificación de Correo y Contraseña</h3>
                            <p>Hola, se le ha registrado en el sistema de delegaciones de la Unidad Nacional de Ciberdelitos.</p>
                            <p>Cuando confirme su cuenta se le redirecionara para que actualice su contraseña</p>
                            <p class="centro" style="text-align: center;">Haga click a continuación .</p>
                            <a href="${confirmationLink}" class="button">Confirmar cuenta</a>
                            <footer><img src="https://i.ibb.co/wyFDdcN/PNE.png"></footer>
                        </div>
                    </body>
                </html>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
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

        const resetPasswordLink = `${process.env.URL_BACKEND}recuperar-password/${encodeURIComponent(token)}`;

        //const resetPasswordLink =`${process.env.URL_FRONTEND}recuperar-password/${token}`;

        const mailOptions = {
            from: process.env.USER_GMAIL,
            to: email,
            subject: "Recuperación de Contraseña",
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f5f5f5;
                                padding: 20px;
                            }
                    
                            .card {
                                background-image: url('https://i.ibb.co/NC31fhM/Plantilla.png');
                                background-size: cover;
                                background-repeat: no-repeat;
                                background-position: center;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                padding: 20px;
                                margin: 20px auto;
                                max-width: 600px;
                            }
                    
                            header {
                                color: #555;
                                /* Cambia el color del texto a gris */
                                text-align: center;
                                /* Centra el encabezado */
                                font-weight: bold;
                                font-family: Arial, sans-serif;
                                font-size: 24px;
                            }
                    
                            h3 {
                                color: #333;
                                text-align: center;
                            }
                    
                            p {
                                color: #555;
                            }
                    
                            .mensaje{
                                color: #555;
                                margin-left: 70px;
                            }
                    
                    
                            a.button {
                                display: block;
                                width: 150px;
                                margin: 20px auto;
                                /* Centrar el botón */
                                background-color: #153557;
                                color: #fff;
                                text-decoration: none;
                                text-align: center;
                                padding: 10px 20px;
                                border-radius: 5px;
                            }
                    
                            a.button:hover {
                                background-color: #0056b3;
                                /* Cambia el color al pasar el mouse */
                            }
                    
                            /* Asegura que la imagen de fondo no afecte el tamaño del contenido */
                            footer {
                                position: relative;
                            }
                    
                            footer img {
                                max-width: 100%;
                                /* Establece el ancho máximo de la imagen al 100% del contenedor */
                                margin-left: 20px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                                margin-right: 20px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                                height: auto;
                                /* Asegura que la altura se ajuste automáticamente según el ancho */
                            }
                        </style>
                    </head>
                    
                    <body>
                        <div class="card">
                            <br>
                            <header>UNIDAD NACIONAL DE CIBERDELITO</header>
                            <h3>Recuperación de Contraseña</h3>
                            <p class="mensaje">Hola, se ha solicitado una recuperación de contraseña para el sistema de delegaciones de la Unidad Nacional
                                de Ciberdelitos.</p>
                            <p style="text-align: center;"> Si usted la ha solicitado haga click a continuación.</p>
                            <a href="${resetPasswordLink}" class="button">Recuperar contraseña</a>
                            <p style="text-align: center;"> Si no omita este mensaje</p></p>
                            <footer><img src="https://i.ibb.co/wyFDdcN/PNE.png"></footer>
                        </div>
                    </body>
                </html>
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
        const mailOptions = {
            from: process.env.USER_GMAIL,
            to: process.env.ADMIN_GMAIL,
            subject: "Solicitud de Registro",
            html: `
                <html>

                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f5f5f5;
                                padding: 20px;
                            }

                            .card {
                                background-image: url('https://i.ibb.co/NC31fhM/Plantilla.png');
                                background-size: cover;
                                background-repeat: no-repeat;
                                background-position: center;
                                border-radius: 8px;
                                border: 1px solid #ccc;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                padding: 20px;
                                margin: 20px auto;
                                max-width: 600px;
                            }

                            header {
                                color: #555;
                                /* Cambia el color del texto a gris */
                                text-align: center;
                                /* Centra el encabezado */
                                font-weight: bold;
                                font-family: Arial, sans-serif;
                                font-size: 24px;
                            }

                            h3 {
                                color: #333;
                                text-align: center;
                            }

                            p {
                                color: #555;
                                margin-left: 60px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                            }


                            a.button {
                                display: block;
                                width: 150px;
                                margin: 20px auto;
                                /* Centrar el botón */
                                background-color: #153557;
                                color: #fff;
                                text-decoration: none;
                                text-align: center;
                                padding: 10px 20px;
                                border-radius: 5px;
                            }

                            a.button:hover {
                                background-color: #0056b3;
                                /* Cambia el color al pasar el mouse */
                            }

                            /* Asegura que la imagen de fondo no afecte el tamaño del contenido */
                            footer {
                                position: relative;
                            }

                            footer img {
                                max-width: 100%;
                                /* Establece el ancho máximo de la imagen al 100% del contenedor */
                                margin-left: 20px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                                margin-right: 20px;
                                /* Agrega un margen derecho para dejar espacio para la imagen */
                                height: auto;
                                /* Asegura que la altura se ajuste automáticamente según el ancho */
                            }
                        </style>
                    </head>

                    <body>
                        <div class="card">
                            <header>UNIDAD NACIONAL DE CIBERDELITO</header>
                            <h3>Verificación de Correo y Contraseña</h3>
                            <p>Se ha solicitado registrar un nuevo usuario en el sistema de delegaciones de la Unidad Nacional de Ciberdelitos con los siguientes detalles:</p>
                            <p><strong>Cédula:</strong> ${cedula}</p>
                            <p><strong>Correo Electrónico:</strong> ${email}</p>
                            <p><strong>Nombre de Usuario:</strong> ${nombreUsuario}</p>
                            <p><strong>Mensaje:</strong> ${mensaje}</p>
                            <footer><img src="https://i.ibb.co/wyFDdcN/PNE.png"></footer>
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
