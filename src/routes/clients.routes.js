const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");

router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.get("/rif/:rif", clientController.getClientByRif);
router.post("/", clientController.createClient);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
