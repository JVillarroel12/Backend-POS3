const Bill = require("../models/bill.model");

const getAllBills = async () => {
  return await Bill.getAllBills();
};

const getBillById = async (id) => {
  return await Bill.getBillById(id);
};
const getBillByClientId = async (clientId) => {
  const bill = await Bill.getBillByClientId(clientId);
  return bill ? bill : {};
};
const createBill = async (billData) => {
  return await Bill.createBill(billData);
};

const updateBill = async (id, billData) => {
  return await Bill.updateBill(id, billData);
};

const deleteBill = async (id) => {
  return await Bill.deleteBill(id);
};

module.exports = {
  getAllBills,
  getBillById,
  getBillByClientId,
  createBill,
  updateBill,
  deleteBill,
};
