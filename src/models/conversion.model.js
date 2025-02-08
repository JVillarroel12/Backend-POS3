const { pool } = require("../config/db");

const getAllConversions = async () => {
  const [rows] = await pool.query(`
      SELECT 
        conversions.*,
        c1.currency_id AS currency_id_from_currency_id,
        c1.name AS currency_id_from_name,
        c1.symbol AS currency_id_from_symbol,
        c2.currency_id AS currency_id_to_currency_id,
        c2.name AS currency_id_to_name,
        c2.symbol AS currency_id_to_symbol
      FROM conversions
      INNER JOIN currencies AS c1 ON conversions.currency_id = c1.currency_id
      INNER JOIN currencies AS c2 ON conversions.currency_id_to = c2.currency_id
    `);

  return rows
    .map((row) => {
      return {
        ...row,
        rate: Number(row.rate),
        currency_from: {
          currency_id: row.currency_id_from_currency_id,
          name: row.currency_id_from_name,
          symbol: row.currency_id_from_symbol,
        },
        currency_to: {
          currency_id: row.currency_id_to_currency_id,
          name: row.currency_id_to_name,
          symbol: row.currency_id_to_symbol,
        },
      };
    })
    .map((row) => {
      const {
        currency_id_from_currency_id,
        currency_id_from_name,
        currency_id_from_symbol,
        currency_id_to_currency_id,
        currency_id_to_name,
        currency_id_to_symbol,
        ...conversionData
      } = row;
      return conversionData;
    });
};

const getConversionById = async (id) => {
  const [rows] = await pool.query(
    `
          SELECT 
              conversions.*,
              c1.currency_id AS currency_id_from_currency_id,
              c1.name AS currency_id_from_name,
              c1.symbol AS currency_id_from_symbol,
              c2.currency_id AS currency_id_to_currency_id,
              c2.name AS currency_id_to_name,
              c2.symbol AS currency_id_to_symbol
          FROM conversions
          INNER JOIN currencies AS c1 ON conversions.currency_id = c1.currency_id
          INNER JOIN currencies AS c2 ON conversions.currency_id_to = c2.currency_id
          WHERE conversions.conversion_id = ?
      `,
    [id]
  );

  if (!rows || rows.length === 0) {
    return null;
  }

  const row = rows[0];

  return {
    ...row,
    rate: Number(row.rate),
    currency_from: {
      currency_id: row.currency_id_from_currency_id,
      name: row.currency_id_from_name,
      symbol: row.currency_id_from_symbol,
    },
    currency_to: {
      currency_id: row.currency_id_to_currency_id,
      name: row.currency_id_to_name,
      symbol: row.currency_id_to_symbol,
    },
  };
};

const createConversion = async (conversionData) => {
  const { currency_id, currency_id_to, rate } = conversionData;
  const [result] = await pool.query(
    "INSERT INTO conversions (currency_id, currency_id_to, rate) VALUES (?, ?, ?)",
    [currency_id, currency_id_to, rate]
  );
  return { conversion_id: result.insertId, ...conversionData };
};

const updateConversion = async (id, conversionData) => {
  const { currency_id, currency_id_to, rate } = conversionData;
  const [result] = await pool.query(
    "UPDATE conversions SET currency_id = ?, currency_id_to = ?, rate = ? WHERE conversion_id = ?",
    [currency_id, currency_id_to, rate, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { conversion_id: id, ...conversionData };
};

const deleteConversion = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM conversions WHERE conversion_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllConversions,
  getConversionById,
  createConversion,
  updateConversion,
  deleteConversion,
};
