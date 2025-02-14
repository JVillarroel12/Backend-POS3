const { pool } = require("../config/db");

const getAllProfileActions = async () => {
  const [rows] = await pool.query("SELECT * FROM profile_actions");
  return rows;
};

const getProfileActionById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM profile_actions WHERE profile_action_id = ?",
    [id]
  );
  return rows[0];
};

const createProfileAction = async (profileActionData) => {
  const { profile_id, action_id } = profileActionData;
  const [result] = await pool.query(
    "INSERT INTO profile_actions (profile_id, action_id) VALUES (?, ?)",
    [profile_id, action_id]
  );
  return { profile_action_id: result.insertId, ...profileActionData };
};
const updateProfileAction = async (id, profileActionData) => {
  const { profile_id, action_id } = profileActionData;
  const [result] = await pool.query(
    "UPDATE profile_actions SET profile_id = ?, action_id = ? WHERE profile_action_id = ?",
    [profile_id, action_id, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { profile_action_id: id, ...profileActionData };
};
const deleteProfileAction = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM profile_actions WHERE profile_action_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

const getProfileActionsByProfileId = async (profileId) => {
  const [rows] = await pool.query(
    "SELECT * FROM profile_actions WHERE profile_id = ?",
    [profileId]
  );
  return rows;
};

const deleteProfileActionsByProfileId = async (profileId) => {
  const [result] = await pool.query(
    "DELETE FROM profile_actions WHERE profile_id = ?",
    [profileId]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllProfileActions,
  getProfileActionById,
  createProfileAction,
  updateProfileAction,
  deleteProfileAction,
  getProfileActionsByProfileId,
  deleteProfileActionsByProfileId,
};
