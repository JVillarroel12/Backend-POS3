const Modifier = require("../models/modifier.model");

const getAllModifiers = async () => {
  return await Modifier.getAllModifiers();
};

const getModifierById = async (id) => {
  return await Modifier.getModifierById(id);
};

const createModifier = async (modifierData) => {
  return await Modifier.createModifier(modifierData);
};

const updateModifier = async (id, modifierData) => {
  return await Modifier.updateModifier(id, modifierData);
};

const deleteModifier = async (id) => {
  return await Modifier.deleteModifier(id);
};

module.exports = {
  getAllModifiers,
  getModifierById,
  createModifier,
  updateModifier,
  deleteModifier,
};
