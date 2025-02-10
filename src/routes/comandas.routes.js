const express = require("express");
const router = express.Router();
const comandaController = require("../controllers/comanda.controller");

router.get("/", comandaController.getAllComandas);
router.get("/:id", comandaController.getComandaById);
router.get("/bill/:billId", comandaController.getAllComandasByBillId);
router.post("/bulk", comandaController.createComandas);
router.put("/:id", comandaController.updateComanda);
router.put("/status/:id", comandaController.updateComandaStatus);
router.delete("/:id", comandaController.deleteComanda);

module.exports = router;
