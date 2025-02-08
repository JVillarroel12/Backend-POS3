const Conversion = require("../models/conversion.model");

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
  return await Conversion.updateConversion(id, conversionData);
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
