const modifierService = require("../services/modifiers.service");

const getAllModifiers = async (req, res) => {
  try {
    const modifiers = await modifierService.getAllModifiers();
    res.json(modifiers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModifierById = async (req, res) => {
  try {
    const modifierId = parseInt(req.params.id);
    const modifier = await modifierService.getModifierById(modifierId);
    if (!modifier) {
      return res.status(404).json({ message: "Modifier not found" });
    }
    res.json(modifier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createModifier = async (req, res) => {
  try {
    const newModifier = await modifierService.createModifier(req.body);
    res.status(201).json(newModifier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateModifier = async (req, res) => {
  try {
    const modifierId = parseInt(req.params.id);
    const updatedModifier = await modifierService.updateModifier(
      modifierId,
      req.body
    );
    if (!updatedModifier) {
      return res.status(404).json({ message: "Modifier not found" });
    }
    res.json(updatedModifier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteModifier = async (req, res) => {
  try {
    const modifierId = parseInt(req.params.id);
    const deleted = await modifierService.deleteModifier(modifierId);
    if (!deleted) {
      return res.status(404).json({ message: "Modifier not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllModifiers,
  getModifierById,
  createModifier,
  updateModifier,
  deleteModifier,
};
