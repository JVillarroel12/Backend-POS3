const { pool } = require("../config/db");

const getAllCurrencies = async () => {
  const [rows] = await pool.query("SELECT * FROM currencies");
  return rows;
};

const getCurrencyById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM currencies WHERE currency_id = ?",
    [id]
  );
  return rows[0];
};

const createCurrency = async (currencyData) => {
  const { name, symbol } = currencyData;
  const [result] = await pool.query(
    "INSERT INTO currencies (name, symbol) VALUES (?, ?)",
    [name, symbol]
  );
  return { currency_id: result.insertId, ...currencyData };
};

const updateCurrency = async (id, currencyData) => {
  const { name, symbol } = currencyData;
  const [result] = await pool.query(
    "UPDATE currencies SET name = ?, symbol = ? WHERE currency_id = ?",
    [name, symbol, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { currency_id: id, ...currencyData };
};

const deleteCurrency = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM currencies WHERE currency_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
