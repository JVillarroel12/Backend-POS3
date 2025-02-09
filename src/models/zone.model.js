const { pool } = require("../config/db");

const getAllZones = async () => {
  const [rows] = await pool.query("SELECT * FROM zone");
  return rows;
};

const getZoneById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM zone WHERE zone_id = ?", [id]);
  return rows[0];
};

const createZone = async (zoneData) => {
  const { name, active } = zoneData;
  const [result] = await pool.query(
    "INSERT INTO zone (name, active) VALUES (?, ?)",
    [name, active]
  );
  return { zone_id: result.insertId, ...zoneData };
};

const updateZone = async (id, zoneData) => {
  const { name, active } = zoneData;
  const [result] = await pool.query(
    "UPDATE zone SET name = ?, active = ? WHERE zone_id = ?",
    [name, active, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { zone_id: id, ...zoneData };
};

const deleteZone = async (id) => {
  const [result] = await pool.query("DELETE FROM zone WHERE zone_id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
};
