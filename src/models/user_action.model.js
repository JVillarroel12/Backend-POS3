const { pool } = require("../config/db");

const getAllUserActions = async () => {
  const [rows] = await pool.query("SELECT * FROM user_actions");
  return rows;
};

const getUserActionById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_actions WHERE action_id = ?",
    [id]
  );
  return rows[0];
};

const createUserAction = async (userActionData) => {
  const { name, description } = userActionData;
  const [result] = await pool.query(
    "INSERT INTO user_actions (name, description) VALUES (?, ?)",
    [name, description]
  );
  return { action_id: result.insertId, ...userActionData };
};

const updateUserAction = async (id, userActionData) => {
  const { name, description } = userActionData;
  const [result] = await pool.query(
    "UPDATE user_actions SET name = ?, description = ? WHERE action_id = ?",
    [name, description, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { action_id: id, ...userActionData };
};

const deleteUserAction = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM user_actions WHERE action_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllUserActions,
  getUserActionById,
  createUserAction,
  updateUserAction,
  deleteUserAction,
};
