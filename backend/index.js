import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DataBase/conection.js';
import authRoutes from './Routes/Auth.routes.js'; // Importa las rutas de autenticación
import cors from 'cors'; // Importa cors si lo necesitas

dotenv.config();

const app = express();

// Middleware para permitir solicitudes de diferentes orígenes
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas de autenticación
app.use('/api/auth', authRoutes);


