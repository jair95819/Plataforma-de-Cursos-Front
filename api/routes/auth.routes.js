const express = require('express');
const router = express.Router();
// ASEGÚRATE DE QUE EL PATH SEA CORRECTO
const User = require('../models/User.model'); 

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario con este email ya existe.' });
    }

    // 2. Crear un nuevo usuario (el middleware pre-save hashea la contraseña)
    const newUser = new User({
      email,
      password,
    });

    const createdUser = await newUser.save(); // <-- El error ocurre ANTES o en esta línea

    // 3. Respuesta exitosa
    res.status(201).json({
      _id: createdUser._id,
      email: createdUser.email,
      message: 'Usuario registrado exitosamente.',
    });

  } catch (error) {
    console.error(error.message);
    // Si la validación falla (ej. email requerido), envia un 400.
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    // Si es otro error (como el fallo de bcrypt), envia 500.
    res.status(500).send('Error del servidor.'); 
  }
});

module.exports = router;