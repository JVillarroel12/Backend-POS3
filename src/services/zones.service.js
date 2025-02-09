const Zone = require("../models/zone.model");

const getAllZones = async () => {
  return await Zone.getAllZones();
};

const getZoneById = async (id) => {
  return await Zone.getZoneById(id);
};

const createZone = async (zoneData) => {
  return await Zone.createZone(zoneData);
};

const updateZone = async (id, zoneData) => {
  return await Zone.updateZone(id, zoneData);
};

const deleteZone = async (id) => {
  return await Zone.deleteZone(id);
};

module.exports = {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
};
