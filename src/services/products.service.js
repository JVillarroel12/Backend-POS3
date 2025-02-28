const Product = require("../models/product.model");

const getAllProducts = async () => {
  return await Product.getAllProducts();
};
const getProductById = async (id) => {
  return await Product.getProductById(id);
};
const createProduct = async (productData) => {
  return await Product.createProduct(productData);
};
const updateProduct = async (id, productData) => {
  return await Product.updateProduct(id, productData);
};
const deleteProduct = async (id) => {
  const product = await Product.deleteProduct(id);
  if (!product) {
    return null;
  }
  await product.destroy();
  return true;
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
