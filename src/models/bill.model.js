const { pool } = require("../config/db");

const getAllBills = async () => {
  const [rows] = await pool.query("select * from bills");
  return rows;
};

const getBillById = async (id) => {
  const [rows] = await pool.query("select * from bills where bill_id = ?", [
    id,
  ]);
  return rows[0];
};
const getBillByClientId = async (clientId) => {
  const [rows] = await pool.query("select * from bills where client_id = ?", [
    clientId,
  ]);
  return rows[0];
};
const createBill = async (billData) => {
  const { client_id, table_id, cod_account, grandtotal } = billData;
  const [result] = await pool.query(
    "insert into bills (client_id, table_id, cod_account, grandtotal) VALUES (?, ?, ?, ?)",
    [client_id, table_id, cod_account, grandtotal]
  );
  return { bill_id: result.insertId, ...billData };
};

const updateBill = async (id, billData) => {
  const { client_id, table_id, cod_account, grandtotal } = billData;
  const [result] = await pool.query(
    "update bills set client_id = ?, table_id = ?, cod_account = ?, grandtotal = ? where bill_id = ?",
    [client_id, table_id, cod_account, grandtotal, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { bill_id: id, ...billData };
};

const deleteBill = async (id) => {
  const [result] = await pool.query("delete from bills where bill_id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllBills,
  getBillById,
  getBillByClientId,
  createBill,
  updateBill,
  deleteBill,
};
