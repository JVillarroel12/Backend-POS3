const billService = require("../services/bills.service");

const getAllBills = async (req, res) => {
  try {
    const bills = await billService.getAllBills();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const billId = parseInt(req.params.id);
    const bill = await billService.getBillById(billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBillByClientId = async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const bill = await billService.getBillByClientId(clientId);
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createBill = async (req, res) => {
  try {
    const newBill = await billService.createBill(req.body);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBill = async (req, res) => {
  try {
    const billId = parseInt(req.params.id);
    const updatedBill = await billService.updateBill(billId, req.body);
    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    const billId = parseInt(req.params.id);
    const deleted = await billService.deleteBill(billId);
    if (!deleted) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBills,
  getBillById,
  getBillByClientId,
  createBill,
  updateBill,
  deleteBill,
};
