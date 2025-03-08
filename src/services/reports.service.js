const Report = require("../models/report.model");

const getCategorySalesReport = async (startDate, endDate) => {
  return await Report.getCategorySalesReport(startDate, endDate);
};
const getCategorySalesReportWithProducts = async (startDate, endDate) => {
  return await Report.getCategorySalesReportWithProducts(startDate, endDate);
};
module.exports = {
  getCategorySalesReport,
  getCategorySalesReportWithProducts,
};
