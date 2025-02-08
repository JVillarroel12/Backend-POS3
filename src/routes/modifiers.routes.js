const express = require("express");
const router = express.Router();
const modifierController = require("../controllers/modifier.controller");

router.get("/", modifierController.getAllModifiers);
router.get("/:id", modifierController.getModifierById);
router.post("/", modifierController.createModifier);
router.put("/:id", modifierController.updateModifier);
router.delete("/:id", modifierController.deleteModifier);

module.exports = router;
