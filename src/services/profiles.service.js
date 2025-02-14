const Profile = require("../models/profile.model");
const ProfileAction = require("../models/profile_action.model"); // Importa el modelo de profile_actions

const getAllProfiles = async () => {
  return await Profile.getAllProfiles();
};

const getProfileById = async (id) => {
  return await Profile.getProfileById(id);
};

const createProfile = async (profileData) => {
  const { name, description, actions } = profileData;

  // 1. Crear el perfil
  const newProfile = await Profile.createProfile({ name, description });

  // 2. Asignar las acciones al perfil
  if (actions && actions.length > 0) {
    for (const action of actions) {
      await ProfileAction.createProfileAction({
        profile_id: newProfile.profile_id,
        action_id: action.action_id,
      });
    }
  }

  return newProfile;
};

const updateProfile = async (id, profileData) => {
  const { name, description, actions } = profileData;

  // 1. Actualizar el perfil
  const updatedProfile = await Profile.updateProfile(id, { name, description });

  // 2. Eliminar las acciones existentes del perfil
  await ProfileAction.deleteProfileActionsByProfileId(id);

  // 3. Insertar las nuevas acciones del perfil
  if (actions && actions.length > 0) {
    for (const action of actions) {
      await ProfileAction.createProfileAction({
        profile_id: id,
        action_id: action.action_id,
      });
    }
  }

  return updatedProfile;
};

const deleteProfile = async (id) => {
  return await Profile.deleteProfile(id);
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
