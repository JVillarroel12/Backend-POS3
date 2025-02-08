const { pool } = require("../config/db");

const getAllStations = async () => {
  const [rows] = await pool.query("SELECT * FROM stations");
  return rows;
};

const getStationById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM stations WHERE station_id = ?",
    [id]
  );
  return rows[0];
};

const createStation = async (stationData) => {
  const { name, type, active } = stationData;
  const [result] = await pool.query(
    "INSERT INTO stations (name, type, active) VALUES (?, ?, ?)",
    [name, type, active]
  );
  return { station_id: result.insertId, ...stationData };
};

const updateStation = async (id, stationData) => {
  const { name, type, active } = stationData;
  const [result] = await pool.query(
    "UPDATE stations SET name = ?, type = ?, active = ? WHERE station_id = ?",
    [name, type, active, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { station_id: id, ...stationData };
};

const deleteStation = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM stations WHERE station_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
