const comandaService = require("../services/comandas.service");

const getAllComandas = async (req, res) => {
  try {
    const comandas = await comandaService.getAllComandas();
    res.json(comandas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComandaById = async (req, res) => {
  try {
    const comandaId = parseInt(req.params.id);
    const comanda = await comandaService.getComandaById(comandaId);
    if (!comanda) {
      return res.status(404).json({ message: "Comanda not found" });
    }
    res.json(comanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComanda = async (req, res) => {
  try {
    const newComanda = await comandaService.createComanda(req.body);
    res.status(201).json(newComanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComandas = async (req, res) => {
  try {
    const comandasData = req.body.data;
    const newComandas = await Promise.all(
      comandasData.map(async (comanda) => {
        return await comandaService.createComandaWithAdditionals(comanda);
      })
    );
    res
      .status(201)
      .json({ message: "Comandas created successfully", data: newComandas });
  } catch (error) {
    console.error("Error in createComandas controller", error);
    res.status(500).json({ error: error.message });
  }
};

const updateComanda = async (req, res) => {
  try {
    const comandaId = parseInt(req.params.id);
    const updatedComanda = await comandaService.updateComanda(
      comandaId,
      req.body
    );
    if (!updatedComanda) {
      return res.status(404).json({ message: "Comanda not found" });
    }
    res.json(updatedComanda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComanda = async (req, res) => {
  try {
    const comandaId = parseInt(req.params.id);
    const deleted = await comandaService.deleteComanda(comandaId);
    if (!deleted) {
      return res.status(404).json({ message: "Comanda not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComandas,
  getComandaById,
  createComandas,
  updateComanda,
  deleteComanda,
  createComanda,
};
