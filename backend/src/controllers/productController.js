const Product = require('../models/productModel');  

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  try {
    const newProduct = await Product.create({ name, price, stock });
    res.status(201).json({ message: 'Producto creado', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el producto', error: err.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el producto', error: err.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();
    res.json({ message: 'Producto actualizado', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: err.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: err.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
