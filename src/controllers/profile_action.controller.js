const profileActionService = require("../services/profile_actions.service");

const getAllProfileActions = async (req, res) => {
  try {
    const profileActions = await profileActionService.getAllProfileActions();
    res.json(profileActions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfileActionById = async (req, res) => {
  try {
    const profileActionId = parseInt(req.params.id);
    const profileAction = await profileActionService.getProfileActionById(
      profileActionId
    );
    if (!profileAction) {
      return res.status(404).json({ message: "ProfileAction not found" });
    }
    res.json(profileAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProfileAction = async (req, res) => {
  try {
    const newProfileAction = await profileActionService.createProfileAction(
      req.body
    );
    res.status(201).json(newProfileAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfileAction = async (req, res) => {
  try {
    const profileActionId = parseInt(req.params.id);
    const updatedProfileAction = await profileActionService.updateProfileAction(
      profileActionId,
      req.body
    );
    if (!updatedProfileAction) {
      return res.status(404).json({ message: "ProfileAction not found" });
    }
    res.json(updatedProfileAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProfileAction = async (req, res) => {
  try {
    const profileActionId = parseInt(req.params.id);
    const deleted = await profileActionService.deleteProfileAction(
      profileActionId
    );
    if (!deleted) {
      return res.status(404).json({ message: "ProfileAction not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfileActionsByProfileId = async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId);
    const profileActions =
      await profileActionService.getProfileActionsByProfileId(profileId);
    res.json(profileActions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProfileActions,
  getProfileActionById,
  createProfileAction,
  updateProfileAction,
  deleteProfileAction,
  getProfileActionsByProfileId,
};
