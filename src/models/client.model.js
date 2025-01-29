const { pool } = require("../config/db");

const getAllClients = async () => {
  const [rows] = await pool.query("select * from clients");
  return rows;
};

const getClientById = async (id) => {
  const [rows] = await pool.query("select * from clients where client_id = ?", [
    id,
  ]);
  return rows[0];
};
const getClientByRif = async (rif) => {
  const [rows] = await pool.query("select * from clients where rif = ?", [rif]);
  return rows[0];
};
const createClient = async (clientData) => {
  const { name, rif } = clientData;
  const [result] = await pool.query(
    "insert into clients (name, rif) values (?, ?)",
    [name, rif]
  );
  return { client_id: result.insertId, ...clientData };
};

const updateClient = async (id, clientData) => {
  const { name, rif } = clientData;
  const [result] = await pool.query(
    "update clients set name = ?, rif = ? where client_id = ?",
    [name, rif, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { client_id: id, ...clientData };
};

const deleteClient = async (id) => {
  const [result] = await pool.query("delete from clients where client_id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllClients,
  getClientById,
  getClientByRif,
  createClient,
  updateClient,
  deleteClient,
};
