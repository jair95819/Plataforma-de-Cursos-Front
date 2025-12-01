const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya emails duplicados
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware PRE-SAVE: Hashear la contraseña antes de guardarla usando async/await.
// Mongoose puede manejar funciones pre-save asíncronas con 'next' si lo necesitas,
// pero a menudo es más fácil sin él, dejando que el error se propague.
UserSchema.pre('save', async function() { 
  const user = this;

  // 1. Solo hashea si la contraseña no ha sido modificada
  if (!user.isModified('password')) {
    return; // Si no se modificó, salimos sin hacer nada
  }
  
  // 2. Ejecutar la lógica de hasheo.
  // Si algo falla aquí, Mongoose captura automáticamente la excepción y no guarda el documento.
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    // Si hay un error, lo lanzamos para que Mongoose lo capture y detenga el guardado.
    console.error('Error durante el hasheo de contraseña (bcrypt):', error.message);
    throw new Error('Error al hashear la contraseña.'); 
  }
});

// Método para comparar contraseñas (útil para el login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;