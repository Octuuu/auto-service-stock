// Middleware para verificar la autenticación del usuario
const jwt = require('jsonwebtoken');

// Función middleware para validar el token JWT
const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // "Bearer <token>"

  // Si no se proporciona el token
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, falta el token' });
  }

  // Verificar el token con JWT
  try {
    // El segundo parámetro es la clave secreta que usas para firmar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Asegúrate de tener esta clave en tu .env
    req.user = decoded; // Puedes guardar la información decodificada del token (como el id del usuario)
    
    next(); // Pasa el control al siguiente middleware o controlador
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
