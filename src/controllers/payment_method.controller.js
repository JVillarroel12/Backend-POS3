const paymentMethodService = require("../services/payment_methods.service");

const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await paymentMethodService.getAllPaymentMethods();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethodId = parseInt(req.params.id);
    const paymentMethod = await paymentMethodService.getPaymentMethodById(
      paymentMethodId
    );
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment Method not found" });
    }
    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPaymentMethod = async (req, res) => {
  try {
    const newPaymentMethod = await paymentMethodService.createPaymentMethod(
      req.body
    );
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const paymentMethodId = parseInt(req.params.id);
    const updatedPaymentMethod = await paymentMethodService.updatePaymentMethod(
      paymentMethodId,
      req.body
    );
    if (!updatedPaymentMethod) {
      return res.status(404).json({ message: "Payment Method not found" });
    }
    res.json(updatedPaymentMethod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethodId = parseInt(req.params.id);
    const deleted = await paymentMethodService.deletePaymentMethod(
      paymentMethodId
    );
    if (!deleted) {
      return res.status(404).json({ message: "Payment Method not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
