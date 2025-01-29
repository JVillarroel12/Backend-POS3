const productService = require("../services/products.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct); // 201 para "Creado"
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = await productService.updateProduct(
      productId,
      req.body
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deleted = await productService.deleteProduct(productId);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
