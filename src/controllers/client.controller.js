const clientService = require("../services/clients.service");

const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await clientService.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getClientByRif = async (req, res) => {
  try {
    const rif = req.params.rif;
    const client = await clientService.getClientByRif(rif);
    res.json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createClient = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const updatedClient = await clientService.updateClient(clientId, req.body);
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const deleted = await clientService.deleteClient(clientId);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  getClientByRif,
  createClient,
  updateClient,
  deleteClient,
};
