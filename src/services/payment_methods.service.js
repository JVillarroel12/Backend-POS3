const PaymentMethod = require("../models/payment_method.model");

const getAllPaymentMethods = async () => {
  return await PaymentMethod.getAllPaymentMethods();
};

const getPaymentMethodById = async (id) => {
  return await PaymentMethod.getPaymentMethodById(id);
};

const createPaymentMethod = async (paymentMethodData) => {
  return await PaymentMethod.createPaymentMethod(paymentMethodData);
};

const updatePaymentMethod = async (id, paymentMethodData) => {
  return await PaymentMethod.updatePaymentMethod(id, paymentMethodData);
};

const deletePaymentMethod = async (id) => {
  return await PaymentMethod.deletePaymentMethod(id);
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
