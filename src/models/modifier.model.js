const { pool } = require("../config/db");

const getAllModifiers = async () => {
  const [rows] = await pool.query("SELECT * FROM modifiers");
  return rows;
};

const getModifierById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM modifiers WHERE modifier_id = ?",
    [id]
  );
  return rows[0];
};

const createModifier = async (modifierData) => {
  const { name, active } = modifierData;
  const [result] = await pool.query(
    "INSERT INTO modifiers (name, active) VALUES (?, ?)",
    [name, active]
  );
  return { modifier_id: result.insertId, ...modifierData };
};

const updateModifier = async (id, modifierData) => {
  const { name, active } = modifierData;
  const [result] = await pool.query(
    "UPDATE modifiers SET name = ?, active = ? WHERE modifier_id = ?",
    [name, active, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { modifier_id: id, ...modifierData };
};

const deleteModifier = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM modifiers WHERE modifier_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllModifiers,
  getModifierById,
  createModifier,
  updateModifier,
  deleteModifier,
};
