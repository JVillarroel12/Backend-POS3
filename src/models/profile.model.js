const { pool } = require("../config/db");

const getAllProfiles = async () => {
  const [profiles] = await pool.query("SELECT * FROM profiles");
  const profilesWithActions = await Promise.all(
    profiles.map(async (profile) => {
      const [actions] = await pool.query(
        `
          SELECT
            action_id
          FROM
            profile_actions
          WHERE
            profile_id = ?
      `,
        [profile.profile_id]
      );
      const actionIds = actions.map((row) => row.action_id);
      return {
        ...profile,
        actions: actionIds,
      };
    })
  );
  return profilesWithActions;
};

const getProfileById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM profiles WHERE profile_id = ?",
    [id]
  );
  return rows[0];
};

const createProfile = async (profileData) => {
  const { name, description } = profileData;
  const [result] = await pool.query(
    "INSERT INTO profiles (name, description) VALUES (?, ?)",
    [name, description]
  );
  return { profile_id: result.insertId, ...profileData };
};

const updateProfile = async (id, profileData) => {
  const { name, description } = profileData;
  const [result] = await pool.query(
    "UPDATE profiles SET name = ?, description = ? WHERE profile_id = ?",
    [name, description, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { profile_id: id, ...profileData };
};

const deleteProfile = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM profiles WHERE profile_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
