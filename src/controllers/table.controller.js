const tableService = require("../services/tables.service");

const getAllTables = async (req, res) => {
  try {
    const tables = await tableService.getAllTables();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTableById = async (req, res) => {
  try {
    const tableId = parseInt(req.params.id);
    const table = await tableService.getTableById(tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTable = async (req, res) => {
  try {
    const newTable = await tableService.createTable(req.body);
    res.status(201).json(newTable);
  } catch (error) {
    if (
      error.message ===
      "El código de mesa ya existe. Por favor, elige un código único."
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
const getTableByCodTable = async (req, res) => {
  try {
    const codTable = req.params.codTable;
    const table = await tableService.getTableByCodTable(codTable);
    res.json(table);
  } catch (error) {
    if (error.message === "No existe la mesa") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
const updateTable = async (req, res) => {
  try {
    const tableId = parseInt(req.params.id);
    const updatedTable = await tableService.updateTable(tableId, req.body);
    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(updatedTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableId = parseInt(req.params.id);
    const deleted = await tableService.deleteTable(tableId);
    if (!deleted) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getTableByCodTable,
};
