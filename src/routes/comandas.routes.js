const express = require("express");
const router = express.Router();
const comandaController = require("../controllers/comanda.controller");

router.get("/", comandaController.getAllComandas);
router.get("/:id", comandaController.getComandaById);
router.post("/bulk", comandaController.createComandas);
router.put("/:id", comandaController.updateComanda);
router.delete("/:id", comandaController.deleteComanda);

module.exports = router;
