const Conversion = require("../models/conversion.model");
const Product = require("../models/product.model");

const getAllConversions = async () => {
  return await Conversion.getAllConversions();
};

const getConversionById = async (id) => {
  return await Conversion.getConversionById(id);
};

const createConversion = async (conversionData) => {
  return await Conversion.createConversion(conversionData);
};

const updateConversion = async (id, conversionData) => {
  const updatedConversion = await Conversion.updateConversion(
    id,
    conversionData
  );

  if (!updatedConversion) {
    return null;
  }

  const newRate = Number(updatedConversion.rate);

  const products = await Product.getAllProducts();

  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      const newPrice = Number(product.price_ref) * newRate;
      const updatedProductData = {
        ...product,
        price: newPrice,
      };
      await Product.updateProduct(product.product_id, updatedProductData);
      return {
        ...product,
        price: newPrice,
      };
    })
  );

  return updatedConversion;
};

const deleteConversion = async (id) => {
  return await Conversion.deleteConversion(id);
};

module.exports = {
  getAllConversions,
  getConversionById,
  createConversion,
  updateConversion,
  deleteConversion,
};
