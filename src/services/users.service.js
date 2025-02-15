const User = require("../models/user.model");

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
  const { user } = userData;

  const existingUser = await User.getUserByUsername(user);

  if (existingUser) {
    throw new Error(
      "El nombre de usuario ya está en uso. Por favor, elige otro nombre de usuario."
    );
  }

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
