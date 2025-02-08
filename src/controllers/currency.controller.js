const currencyService = require("../services/currencies.service");

const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await currencyService.getAllCurrencies();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrencyById = async (req, res) => {
  try {
    const currencyId = parseInt(req.params.id);
    const currency = await currencyService.getCurrencyById(currencyId);
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }
    res.json(currency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCurrency = async (req, res) => {
  try {
    const newCurrency = await currencyService.createCurrency(req.body);
    res.status(201).json(newCurrency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCurrency = async (req, res) => {
  try {
    const currencyId = parseInt(req.params.id);
    const updatedCurrency = await currencyService.updateCurrency(
      currencyId,
      req.body
    );
    if (!updatedCurrency) {
      return res.status(404).json({ message: "Currency not found" });
    }
    res.json(updatedCurrency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCurrency = async (req, res) => {
  try {
    const currencyId = parseInt(req.params.id);
    const deleted = await currencyService.deleteCurrency(currencyId);
    if (!deleted) {
      return res.status(404).json({ message: "Currency not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
