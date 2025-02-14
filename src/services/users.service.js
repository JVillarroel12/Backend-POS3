const User = require("../models//user.model");

const getAllUsers = async () => {
  return await User.getAllUsers();
};

const getUserById = async (id) => {
  return await User.getUserById(id);
};

const getUserByUsername = async (username) => {
  return await User.getUserByUsername(username);
};

const createUser = async (userData) => {
  return await User.createUser(userData);
};

const updateUser = async (id, userData) => {
  return await User.updateUser(id, userData);
};

const deleteUser = async (id) => {
  return await User.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
