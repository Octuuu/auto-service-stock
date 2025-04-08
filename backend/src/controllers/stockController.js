const { Movement } = require('../models/movementModel');
const { Product } = require('../models/productModel');

// Registrar un movimiento de stock (añadir o quitar)
const registerMovement = async (req, res) => {
  const { productId, quantity, type } = req.body;  // 'type' puede ser 'entrada' o 'salida'

  try {
    // Verificar si el producto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar el stock del producto
    if (type === 'entrada') {
      product.stock += quantity;
    } else if (type === 'salida') {
      if (product.stock < quantity) {
        return res.status(400).json({ message: 'No hay suficiente stock' });
      }
      product.stock -= quantity;
    }

    await product.save();

    // Registrar el movimiento de stock
    await Movement.create({ productId, quantity, type });

    res.json({ message: 'Movimiento registrado exitosamente', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el movimiento', error: err.message });
  }
};

// Obtener el historial de movimientos de stock
const getMovementHistory = async (req, res) => {
  try {
    const movements = await Movement.findAll();
    res.json({ movements });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el historial', error: err.message });
  }
};

module.exports = { registerMovement, getMovementHistory };
