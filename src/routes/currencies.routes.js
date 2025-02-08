const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currency.controller");

router.get("/", currencyController.getAllCurrencies);
router.get("/:id", currencyController.getCurrencyById);
router.post("/", currencyController.createCurrency);
router.put("/:id", currencyController.updateCurrency);
router.delete("/:id", currencyController.deleteCurrency);

module.exports = router;
