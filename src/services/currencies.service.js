const Currency = require("../models/currency.model");

const getAllCurrencies = async () => {
  return await Currency.getAllCurrencies();
};

const getCurrencyById = async (id) => {
  return await Currency.getCurrencyById(id);
};

const createCurrency = async (currencyData) => {
  return await Currency.createCurrency(currencyData);
};

const updateCurrency = async (id, currencyData) => {
  return await Currency.updateCurrency(id, currencyData);
};

const deleteCurrency = async (id) => {
  return await Currency.deleteCurrency(id);
};

module.exports = {
  getAllCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
