const Table = require("../models/table.model");

const getAllTables = async () => {
  return await Table.getAllTables();
};

const getTableById = async (id) => {
  return await Table.getTableById(id);
};

const createTable = async (tableData) => {
  return await Table.createTable(tableData);
};

const updateTable = async (id, tableData) => {
  return await Table.updateTable(id, tableData);
};

const deleteTable = async (id) => {
  return await Table.deleteTable(id);
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
};
