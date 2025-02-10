const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table.controller");

router.get("/", tableController.getAllTables);
router.get("/:id", tableController.getTableById);
router.get("/cod/:codTable", tableController.getTableByCodTable);
router.post("/", tableController.createTable);
router.put("/:id", tableController.updateTable);
router.delete("/:id", tableController.deleteTable);

module.exports = router;
