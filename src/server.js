// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import usuarioRouters from '../src/routers/usuarioRouters.js';
import delegacionRouters from '../src/routers/delegacionRouters.js';
import delitosRouters from '../src/routers/delitosRouters.js';
import agentesRouters from '../src/routers/agenteRouters.js'


// Inicializaciones
const app = express()
dotenv.config()

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



app.get('/',(req,res)=>{
    res.send("Server on")
})

// Exportar la instancia de express por medio de app
export default  app