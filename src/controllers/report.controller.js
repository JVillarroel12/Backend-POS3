const reportService = require("../services/reports.service");

const getCategorySalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const report = await reportService.getCategorySalesReport(
      startDate,
      endDate
    );
    res.json(report);
  } catch (error) {
    console.error("Error in getCategorySalesReport controller", error);
    res.status(500).json({ error: error.message });
  }
};
const getCategorySalesReportWithProducts = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const report = await reportService.getCategorySalesReportWithProducts(
      startDate,
      endDate
    );
    res.json(report);
  } catch (error) {
    console.error(
      "Error in getCategorySalesReportWithProducts controller",
      error
    );
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getCategorySalesReport,
  getCategorySalesReportWithProducts,
};
