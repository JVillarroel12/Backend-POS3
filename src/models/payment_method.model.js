const { pool } = require("../config/db");

const getAllPaymentMethods = async () => {
  const [rows] = await pool.query(`
    select 
      payment_methods.*,
      currencies.currency_id as currency_currency_id,
      currencies.name as currency_name,
      currencies.symbol as currency_symbol
    from payment_methods
    inner join currencies on payment_methods.currency_id = currencies.currency_id
  `);
  return rows
    .map((row) => {
      return {
        ...row,
        currency: {
          currency_id: row.currency_currency_id,
          name: row.currency_name,
          symbol: row.currency_symbol,
        },
      };
    })
    .map((row) => {
      const {
        currency_currency_id,
        currency_name,
        currency_symbol,
        ...paymentMethodData
      } = row;
      return paymentMethodData;
    });
};

const getPaymentMethodById = async (id) => {
  const [rows] = await pool.query(
    `
    select 
        payment_methods.*,
        currencies.currency_id as currency_currency_id,
        currencies.name as currency_name,
        currencies.symbol as currency_symbol
    from payment_methods
    inner join currencies on payment_methods.currency_id = currencies.currency_id
    where payment_method_id = ?
  `,
    [id]
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  const row = rows[0];
  return {
    ...row,
    currency: {
      currency_id: row.currency_currency_id,
      name: row.currency_name,
      symbol: row.currency_symbol,
    },
  };
};

const createPaymentMethod = async (paymentMethodData) => {
  const { currency_id, name, active } = paymentMethodData;
  const [result] = await pool.query(
    "INSERT INTO payment_methods (currency_id, name, active) VALUES (?, ?, ?)",
    [currency_id, name, active]
  );
  return { payment_method_id: result.insertId, ...paymentMethodData };
};

const updatePaymentMethod = async (id, paymentMethodData) => {
  const { currency_id, name, active } = paymentMethodData;
  const [result] = await pool.query(
    "UPDATE payment_methods SET currency_id = ?, name = ?, active = ? WHERE payment_method_id = ?",
    [currency_id, name, active, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { payment_method_id: id, ...paymentMethodData };
};

const deletePaymentMethod = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM payment_methods WHERE payment_method_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
