const express = require("express");
const router = express.Router();
const profileActionController = require("../controllers/profile_action.controller");

router.get("/", profileActionController.getAllProfileActions);
router.get("/:id", profileActionController.getProfileActionById);
router.post("/", profileActionController.createProfileAction);
router.get(
  "/profile/:profileId",
  profileActionController.getProfileActionsByProfileId
);
router.put("/:id", profileActionController.updateProfileAction);
router.delete("/:id", profileActionController.deleteProfileAction);

module.exports = router;
