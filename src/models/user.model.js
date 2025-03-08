const { pool } = require("../config/db");

const getAllUsers = async () => {
  const [rows] = await pool.query(`
    SELECT 
      users.*,
      profiles.profile_id AS profile_profile_id,
      profiles.name AS profile_name,
      profiles.description AS profile_description
    FROM users
    LEFT JOIN profiles ON users.profile_id = profiles.profile_id
  `);

  return rows
    .map((row) => {
      return {
        ...row,
        profile: row.profile_profile_id
          ? {
              profile_id: row.profile_profile_id,
              name: row.profile_name,
              description: row.profile_description,
            }
          : null,
      };
    })
    .map((row) => {
      const {
        profile_profile_id,
        profile_name,
        profile_description,
        ...userData
      } = row;
      return userData;
    });
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
          profiles.profile_id as profile_profile_id,
          GROUP_CONCAT(ua.action_id, '||', ua.name SEPARATOR '&&') AS actions
      FROM users
      LEFT JOIN profiles ON users.profile_id = profiles.profile_id
      LEFT JOIN profile_actions pa ON profiles.profile_id = pa.profile_id
      LEFT JOIN user_actions ua ON pa.action_id = ua.action_id
      WHERE users.user = ?
      GROUP BY users.user_id
    `,
    [username]
  );

  if (!rows || rows.length === 0) {
    return null;
  }

  const row = rows[0];

  let actions = [];
  if (row.actions) {
    actions = row.actions.split("&&").map((action) => {
      const [action_id, name] = action.split("||");
      return {
        action_id: parseInt(action_id),
        name: name,
      };
    });
  }

  return {
    ...row,
    actions: actions,
    profile: {
      profile_name: row.profile_name,
      profile_profile_id: row.profile_profile_id,
    },
  };
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
