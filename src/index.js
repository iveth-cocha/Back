import app from './server.js'
import connectDatabase from './database.js';



app.listen(app.get('port'),()=>{
    console.log(`Servidor listo en http://localhost:${app.get('port')}`);
})

connectDatabase()