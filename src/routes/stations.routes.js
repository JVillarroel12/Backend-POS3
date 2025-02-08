const express = require("express");
const router = express.Router();
const stationController = require("../controllers/station.controller");

router.get("/", stationController.getAllStations);
router.get("/:id", stationController.getStationById);
router.post("/", stationController.createStation);
router.put("/:id", stationController.updateStation);
router.delete("/:id", stationController.deleteStation);

module.exports = router;
