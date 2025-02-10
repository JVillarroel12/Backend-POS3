const { pool } = require("../config/db");

const getAllTables = async () => {
  const [rows] = await pool.query(`
    SELECT 
      tables.*,
      zone.zone_id AS zone_zone_id,
      zone.name AS zone_name,
      zone.active AS zone_active,
      zone.date_creation AS zone_date_creation
    FROM tables
    INNER JOIN zone ON tables.zone_id = zone.zone_id
  `);

  return rows
    .map((row) => {
      return {
        ...row,
        zone: {
          zone_id: row.zone_zone_id,
          name: row.zone_name,
          active: row.zone_active,
          date_creation: row.zone_date_creation,
        },
      };
    })
    .map((row) => {
      const {
        zone_zone_id,
        zone_name,
        zone_active,
        zone_date_creation,
        ...tableData
      } = row;
      return tableData;
    });
};

const getTableById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM tables WHERE table_id = ?", [
    id,
  ]);
  return rows[0];
};
const getTableByCodTable = async (codTable) => {
  const [rows] = await pool.query(
    `
      SELECT 
          tables.*,
          zone.zone_id AS zone_zone_id,
          zone.name AS zone_name,
          zone.active AS zone_active,
          zone.date_creation AS zone_date_creation
      FROM tables
      INNER JOIN zone ON tables.zone_id = zone.zone_id
      WHERE tables.cod_table = ?
  `,
    [codTable]
  );

  if (!rows || rows.length === 0) {
    return null;
  }

  const row = rows[0];

  return {
    ...row,
    zone: {
      zone_id: row.zone_zone_id,
      name: row.zone_name,
      active: row.zone_active,
      date_creation: row.zone_date_creation,
    },
  };
};
const createTable = async (tableData) => {
  const { zone_id, name, active, cod_table } = tableData;
  try {
    const [result] = await pool.query(
      "INSERT INTO tables (zone_id, name, active, cod_table) VALUES (?, ?, ?, ?)",
      [zone_id, name, active, cod_table]
    );
    return { table_id: result.insertId, ...tableData };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error(
        "El código de mesa ya existe. Por favor, elige un código único."
      );
    }
    throw error; // Re-lanza el error para que se maneje en el controlador
  }
};

const updateTable = async (id, tableData) => {
  const { zone_id, name, active, cod_table } = tableData;
  const [result] = await pool.query(
    "UPDATE tables SET zone_id = ?, name = ?, active = ?, cod_table = ? WHERE table_id = ?",
    [zone_id, name, active, cod_table, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { table_id: id, ...tableData };
};

const deleteTable = async (id) => {
  const [result] = await pool.query("DELETE FROM tables WHERE table_id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getTableByCodTable,
};
