const Comanda = require("../models//comanda.model");
const { getIO } = require("../../socket");

const getAllComandas = async () => {
  return await Comanda.getAllComandas();
};

const getComandaById = async (id) => {
  return await Comanda.getComandaById(id);
};
const getAllComandasByBillId = async (billId) => {
  return await Comanda.getAllComandasByBillId(billId);
};
const createComanda = async (comandaData) => {
  return await Comanda.createComanda(comandaData);
};

const createComandaWithAdditionals = async (comandaData) => {
  const newComanda = await Comanda.createComandaWithAdditionals(comandaData);
  const comandas = await Comanda.getStatus();
  getIO().emit("comandas", comandas);
  return newComanda;
};

const updateComanda = async (id, comandaData) => {
  return await Comanda.updateComanda(id, comandaData);
};
const updateComandaStatus = async (comandaId, status) => {
  console.log("STATUS SERVICE =>", status);

  const updated = await Comanda.updateComandaStatus(comandaId, status);
  if (updated) {
    const comandas = await Comanda.getStatus();
    getIO().emit("comandas", comandas);
  }
  return updated;
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
  getAllComandasByBillId,
  updateComandaStatus,
};
