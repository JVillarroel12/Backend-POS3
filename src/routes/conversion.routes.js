const express = require("express");
const router = express.Router();
const conversionController = require("../controllers/conversion.controller");

router.get("/", conversionController.getAllConversions);
router.get("/:id", conversionController.getConversionById);
router.post("/", conversionController.createConversion);
router.put("/:id", conversionController.updateConversion);
router.delete("/:id", conversionController.deleteConversion);

module.exports = router;
