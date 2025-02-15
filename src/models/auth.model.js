const { pool } = require("../config/db");

const authenticateUser = async (user, password) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user = ?", [user]);
  const userResult = rows[0];

  if (!userResult) {
    return null;
  }

  if (userResult.password !== password) {
    return false;
  }

  return userResult;
};

module.exports = {
  authenticateUser,
};
