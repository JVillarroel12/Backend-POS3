const stationService = require("../services/stations.service");

const getAllStations = async (req, res) => {
  try {
    const stations = await stationService.getAllStations();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStationById = async (req, res) => {
  try {
    const stationId = parseInt(req.params.id);
    const station = await stationService.getStationById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStation = async (req, res) => {
  try {
    const newStation = await stationService.createStation(req.body);
    res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStation = async (req, res) => {
  try {
    const stationId = parseInt(req.params.id);
    const updatedStation = await stationService.updateStation(
      stationId,
      req.body
    );
    if (!updatedStation) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.json(updatedStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStation = async (req, res) => {
  try {
    const stationId = parseInt(req.params.id);
    const deleted = await stationService.deleteStation(stationId);
    if (!deleted) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
