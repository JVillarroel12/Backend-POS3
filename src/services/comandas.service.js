const Comanda = require("../models//comanda.model");

const getAllComandas = async () => {
  return await Comanda.getAllComandas();
};

const getComandaById = async (id) => {
  return await Comanda.getComandaById(id);
};

const createComanda = async (comandaData) => {
  return await Comanda.createComanda(comandaData);
};

const createComandaWithAdditionals = async (comandaData) => {
  return await Comanda.createComandaWithAdditionals(comandaData);
};

const updateComanda = async (id, comandaData) => {
  return await Comanda.updateComanda(id, comandaData);
};

const deleteComanda = async (id) => {
  return await Comanda.deleteComanda(id);
};

module.exports = {
  getAllComandas,
  getComandaById,
  createComandaWithAdditionals,
  updateComanda,
  deleteComanda,
  createComanda,
};
