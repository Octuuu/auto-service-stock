const app = require('./app');
const sequelize = require('./src/config/db');
require('dotenv').config();

// Modelos (importar para sincronizar tablas)
require('./src/models/userModel');
require('./src/models/productModel');
require('./src/models/movementModel');

const PORT =  3000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // sincroniza tablas con la DB
    console.log('📦 Base de datos conectada correctamente');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    // Mejor manejo de errores
    console.error('❌ Error al conectar la base de datos:', error.message);
    console.error(error.stack); // Esto mostrará el stack trace completo
    process.exit(1); // Salir con un código de error si la conexión falla
  }
})();

