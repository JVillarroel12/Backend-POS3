const { pool } = require("../config/db");

const getAllBills = async () => {
  const [rows] = await pool.query(`
    SELECT 
      b.*,
      c.name AS client_name,
      c.rif AS client_rif,
      COALESCE(SUM(comandas.price * comandas.qty), 0) + 
      COALESCE((SELECT SUM(price * qty) FROM comanda_additionals WHERE comanda_id IN (SELECT comanda_id FROM comandas WHERE bill_id = b.bill_id)), 0) AS total_price,
      COALESCE(SUM(comandas.price_ref * comandas.qty), 0) + 
      COALESCE((SELECT SUM(price_ref * qty) FROM comanda_additionals WHERE comanda_id IN (SELECT comanda_id FROM comandas WHERE bill_id = b.bill_id)), 0) AS total_price_ref
    FROM bills b
    INNER JOIN clients c ON b.client_id = c.client_id
    LEFT JOIN comandas ON b.bill_id = comandas.bill_id
    GROUP BY b.bill_id, c.name, c.rif
  `);

  return rows
    .map((row) => {
      return {
        ...row,
        client: {
          name: row.client_name,
          rif: row.client_rif,
        },
        total_price: Number(row.total_price || 0), // Asegura que sea un número
        total_price_ref: Number(row.total_price_ref || 0), // Asegura que sea un número
      };
    })
    .map((row) => {
      const { client_name, client_rif, ...dataBill } = row;
      return dataBill;
    });
};

const getBillById = async (id) => {
  const [rows] = await pool.query("select * from bills where bill_id = ?", [
    id,
  ]);
  return rows[0];
};
const getBillByClientId = async (clientId) => {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM bills
      WHERE client_id = ? AND invoiced = 0
      ORDER BY date_creation DESC
      LIMIT 1
  `,
    [clientId]
  );
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
const updateBillsInvoiced = async (billIds) => {
  console.log("model =>", billIds);

  console.log("Activar en updateBils invoiced =>", billIds);
  const query = `
      UPDATE bills
      SET invoiced = 1
      WHERE bill_id IN (?)
  `;
  const [result] = await pool.query(query, [billIds]);
  return result.affectedRows;
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
  updateBillsInvoiced,
  deleteBill,
};
