const express = require("express");
const router = express.Router();
const billController = require("../controllers/bill.controller");

router.get("/", billController.getAllBills);
router.get("/:id", billController.getBillById);
router.get("/client/:clientId", billController.getBillByClientId);
router.post("/", billController.createBill);
router.put("/invoiced", billController.updateBillsInvoiced);
router.put("/:id", billController.updateBill);
router.delete("/:id", billController.deleteBill);

module.exports = router;
