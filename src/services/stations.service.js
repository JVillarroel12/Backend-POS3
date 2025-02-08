const Station = require("../models/station.model");

const getAllStations = async () => {
  return await Station.getAllStations();
};

const getStationById = async (id) => {
  return await Station.getStationById(id);
};

const createStation = async (stationData) => {
  return await Station.createStation(stationData);
};

const updateStation = async (id, stationData) => {
  return await Station.updateStation(id, stationData);
};

const deleteStation = async (id) => {
  return await Station.deleteStation(id);
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
