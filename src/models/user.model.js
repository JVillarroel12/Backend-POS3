const { pool } = require("../config/db");

const getAllUsers = async () => {
  const [rows] = await pool.query(`
        SELECT 
            users.*,
            profiles.name as profile_name,
            profiles.profile_id as profile_profile_id
        FROM users
        LEFT JOIN profiles ON users.profile_id = profiles.profile_id
    `);
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await pool.query(
    `
        SELECT 
            users.*,
            profiles.name as profile_name,
            profiles.profile_id as profile_profile_id
        FROM users
        LEFT JOIN profiles ON users.profile_id = profiles.profile_id
        WHERE users.user_id = ?
    `,
    [id]
  );
  return rows[0];
};

const getUserByUsername = async (username) => {
  const [rows] = await pool.query(
    `
        SELECT 
            users.*,
            profiles.name as profile_name,
            profiles.profile_id as profile_profile_id
        FROM users
        LEFT JOIN profiles ON users.profile_id = profiles.profile_id
        WHERE users.user = ?
    `,
    [username]
  );
  return rows[0];
};

const createUser = async (userData) => {
  const { user, password, profile_id } = userData;
  const [result] = await pool.query(
    "INSERT INTO users (user, password, profile_id) VALUES (?, ?, ?)",
    [user, password, profile_id]
  );
  return { user_id: result.insertId, ...userData };
};

const updateUser = async (id, userData) => {
  const { user, password, profile_id } = userData;
  const [result] = await pool.query(
    "UPDATE users SET user = ?, password = ?, profile_id = ? WHERE user_id = ?",
    [user, password, profile_id, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { user_id: id, ...userData };
};

const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
