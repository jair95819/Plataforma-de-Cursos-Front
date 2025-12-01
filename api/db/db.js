const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; 
    // Mongoose automáticamente maneja el useNewUrlParser y useUnifiedTopology
    await mongoose.connect(uri);
    console.log('✅ MongoDB Atlas conectado exitosamente.');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    // Sale del proceso con fallo si no puede conectar
    process.exit(1); 
  }
};

module.exports = connectDB;