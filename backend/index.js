import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DataBase/conection.js';
import authRoutes from './Routes/Auth.routes.js'; // Importa las rutas de autenticación
import cors from 'cors'; // Importa cors si lo necesitas
import usersRoute from './Routes/User.routes.js';
import postsRoutes from './Routes/Posts.routes.js'

dotenv.config();

const app = express();
// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());
// Middleware para permitir solicitudes de diferentes orígenes
app.use(cors());
// Rutas de autenticación
app.use('/auth', authRoutes);
app.use('/', usersRoute)
app.use('/', postsRoutes)

// Conexión a la base de datos
connectDB();




const PORT = process.env.PORT ;
app.listen(PORT, ()=>{
    console.log(`Conexion en puerto ${PORT},Ok `)
})


