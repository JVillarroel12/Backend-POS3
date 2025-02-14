const profileService = require("../services/profiles.service");

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profileId = parseInt(req.params.id);
    const profile = await profileService.getProfileById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profileId = parseInt(req.params.id);
    const updatedProfile = await profileService.updateProfile(
      profileId,
      req.body
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const profileId = parseInt(req.params.id);
    const deleted = await profileService.deleteProfile(profileId);
    if (!deleted) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
