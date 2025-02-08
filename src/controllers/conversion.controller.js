const conversionService = require("../services/conversions.service");

const getAllConversions = async (req, res) => {
  try {
    const conversions = await conversionService.getAllConversions();
    res.json(conversions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConversionById = async (req, res) => {
  try {
    const conversionId = parseInt(req.params.id);
    const conversion = await conversionService.getConversionById(conversionId);
    if (!conversion) {
      return res.status(404).json({ message: "Conversion not found" });
    }
    res.json(conversion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createConversion = async (req, res) => {
  try {
    const newConversion = await conversionService.createConversion(req.body);
    res.status(201).json(newConversion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateConversion = async (req, res) => {
  try {
    const conversionId = parseInt(req.params.id);
    const updatedConversion = await conversionService.updateConversion(
      conversionId,
      req.body
    );
    if (!updatedConversion) {
      return res.status(404).json({ message: "Conversion not found" });
    }
    res.json(updatedConversion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteConversion = async (req, res) => {
  try {
    const conversionId = parseInt(req.params.id);
    const deleted = await conversionService.deleteConversion(conversionId);
    if (!deleted) {
      return res.status(404).json({ message: "Conversion not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllConversions,
  getConversionById,
  createConversion,
  updateConversion,
  deleteConversion,
};
