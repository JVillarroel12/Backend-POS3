const UserAction = require("../models/user_action.model");

const getAllUserActions = async () => {
  return await UserAction.getAllUserActions();
};

const getUserActionById = async (id) => {
  return await UserAction.getUserActionById(id);
};

const createUserAction = async (userActionData) => {
  return await UserAction.createUserAction(userActionData);
};

const updateUserAction = async (id, userActionData) => {
  return await UserAction.updateUserAction(id, userActionData);
};

const deleteUserAction = async (id) => {
  return await UserAction.deleteUserAction(id);
};

module.exports = {
  getAllUserActions,
  getUserActionById,
  createUserAction,
  updateUserAction,
  deleteUserAction,
};
