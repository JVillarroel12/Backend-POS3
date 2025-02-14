const ProfileAction = require("../models/profile_action.model");
const getAllProfileActions = async () => {
  return await ProfileAction.getAllProfileActions();
};

const getProfileActionById = async (id) => {
  return await ProfileAction.getProfileActionById(id);
};

const createProfileAction = async (profileActionData) => {
  return await ProfileAction.createProfileAction(profileActionData);
};

const updateProfileAction = async (id, profileActionData) => {
  return await ProfileAction.updateProfileAction(id, profileActionData);
};

const deleteProfileAction = async (id) => {
  return await ProfileAction.deleteProfileAction(id);
};
const getProfileActionsByProfileId = async (profileId) => {
  return await ProfileAction.getProfileActionsByProfileId(profileId);
};
module.exports = {
  getAllProfileActions,
  getProfileActionById,
  createProfileAction,
  updateProfileAction,
  deleteProfileAction,
  getProfileActionsByProfileId,
};
