// Carga las variables de entorno del archivo .env
require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); // <-- NUEVA LÍNEA: Importar CORS
const connectDB = require('./db/db'); 
const authRoutes = require('./routes/auth.routes'); 

const app = express();

// Middleware
app.use(express.json()); 

// <-- NUEVO BLOQUE: Habilitar CORS para permitir la comunicación con Angular
app.use(cors({
    // Permite que solo el dominio de Angular se conecte
    origin: 'http://localhost:4200',
    credentials: true,
}));

// 1. Conexión a la base de datos
connectDB();

// 2. Definición de rutas
// Todas las rutas de autenticación comenzarán con /api/auth
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor Node.js corriendo en el puerto ${PORT}`));