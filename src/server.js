// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import usuarioRouters from '../src/routers/usuarioRouters.js';
import delegacionRouters from '../src/routers/delegacionRouters.js';
import delitosRouters from '../src/routers/delitosRouters.js';
import agentesRouters from '../src/routers/agenteRouters.js'
import mapeoRouters from '../src/routers/mapeoRouters.js'

// Inicializaciones
const app = express()
dotenv.config()
const prisma = new PrismaClient();

// Función para inicializar usuario y agente por defecto
const initializeDefaultUser = async () => {
    try {
      // Verificar si el usuario por defecto ya existe
      const defaultUserEmail = 'Iveth.cocha.2001@gmail.com';
      const defaultUser = await prisma.usuario.findUnique({
        where: { email: defaultUserEmail }
      });

      // Verificar si el agente por defecto ya existe
      const defaultAgent = await prisma.agente.findUnique({
        where: { Cedula: '0000000000' }
      });
  
      if (!defaultUser && !defaultAgent) {
        // Crear el usuario y agente por defecto
        const hashedPassword = await bcrypt.hash('Ciberpol2024**', 10);
        await prisma.usuario.create({
          data: {
            nombre: 'Iveth Cocha',
            email: 'Iveth.cocha.2001@gmail.com',
            password: hashedPassword,
            Rol: 'Administrador',
            confirmEmail: true,
            agente: {
              create: {
                Cedula: '0000000000',
                Apellido_Nombre: 'Iveth Cocha',
                Grado: 'Poli.',
                FechaNacimiento:'00/00/0000',
                Terno: 25,
                Camisa: 15,
                Calzado: 40,
                Cabeza: 15
              }
            }
          }
        });
        console.log('Usuario y agente por defecto creado.');
      } else {
        console.log('Usuario y agente por defecto ya existen. No se creó ningún usuario ni agente.');
      }
    } catch (error) {
      console.error('Error al inicializar el usuario y agente por defecto:', error);
    }
};



// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.use('/api', usuarioRouters);
app.use('/api', delegacionRouters);
app.use('/api', delitosRouters);
app.use('/api', agentesRouters);
app.use('/api', mapeoRouters);

initializeDefaultUser();
  
app.get('/',(req,res)=>{
    res.send("Server on")
})


// Exportar la instancia de express por medio de app
export default  app