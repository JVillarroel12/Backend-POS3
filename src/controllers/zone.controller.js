const zoneService = require("../services/zones.service");

const getAllZones = async (req, res) => {
  try {
    const zones = await zoneService.getAllZones();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getZoneById = async (req, res) => {
  try {
    const zoneId = parseInt(req.params.id);
    const zone = await zoneService.getZoneById(zoneId);
    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createZone = async (req, res) => {
  try {
    const newZone = await zoneService.createZone(req.body);
    res.status(201).json(newZone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateZone = async (req, res) => {
  try {
    const zoneId = parseInt(req.params.id);
    const updatedZone = await zoneService.updateZone(zoneId, req.body);
    if (!updatedZone) {
      return res.status(404).json({ message: "Zone not found" });
    }
    res.json(updatedZone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteZone = async (req, res) => {
  try {
    const zoneId = parseInt(req.params.id);
    const deleted = await zoneService.deleteZone(zoneId);
    if (!deleted) {
      return res.status(404).json({ message: "Zone not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
};
