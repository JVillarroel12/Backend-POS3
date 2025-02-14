const express = require("express");
const router = express.Router();
const userActionController = require("../controllers/user_action.controller");

router.get("/", userActionController.getAllUserActions);
router.get("/:id", userActionController.getUserActionById);
router.post("/", userActionController.createUserAction);
router.put("/:id", userActionController.updateUserAction);
router.delete("/:id", userActionController.deleteUserAction);

module.exports = router;
