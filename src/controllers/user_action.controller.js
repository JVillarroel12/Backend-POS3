const userActionService = require("../services/user_actions.service");

const getAllUserActions = async (req, res) => {
  try {
    const userActions = await userActionService.getAllUserActions();
    res.json(userActions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserActionById = async (req, res) => {
  try {
    const actionId = parseInt(req.params.id);
    const userAction = await userActionService.getUserActionById(actionId);
    if (!userAction) {
      return res.status(404).json({ message: "UserAction not found" });
    }
    res.json(userAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserAction = async (req, res) => {
  try {
    const newUserAction = await userActionService.createUserAction(req.body);
    res.status(201).json(newUserAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserAction = async (req, res) => {
  try {
    const actionId = parseInt(req.params.id);
    const updatedUserAction = await userActionService.updateUserAction(
      actionId,
      req.body
    );
    if (!updatedUserAction) {
      return res.status(404).json({ message: "UserAction not found" });
    }
    res.json(updatedUserAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserAction = async (req, res) => {
  try {
    const actionId = parseInt(req.params.id);
    const deleted = await userActionService.deleteUserAction(actionId);
    if (!deleted) {
      return res.status(404).json({ message: "UserAction not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserActions,
  getUserActionById,
  createUserAction,
  updateUserAction,
  deleteUserAction,
};
