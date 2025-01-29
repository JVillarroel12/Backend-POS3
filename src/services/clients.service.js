const Client = require("../models/client.model");

const getAllClients = async () => {
  return await Client.getAllClients();
};

const getClientById = async (id) => {
  return await Client.getClientById(id);
};
const getClientByRif = async (rif) => {
  const client = await Client.getClientByRif(rif);
  if (!client) {
    throw new Error("Cliente no encontrado");
  }
  return client;
};
const createClient = async (clientData) => {
  return await Client.createClient(clientData);
};

const updateClient = async (id, clientData) => {
  return await Client.updateClient(id, clientData);
};

const deleteClient = async (id) => {
  return await Client.deleteClient(id);
};

module.exports = {
  getAllClients,
  getClientById,
  getClientByRif,
  createClient,
  updateClient,
  deleteClient,
};
