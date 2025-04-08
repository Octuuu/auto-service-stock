require('dotenv').config(); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Importar controladores
const { register, login } = require('./src/controllers/authController');

app.use(bodyParser.json()); // Asegúrate de que las solicitudes sean interpretadas como JSON

// Rutas de registro y login
app.post('/register', register);
app.post('/login', login);

module.exports = app;
