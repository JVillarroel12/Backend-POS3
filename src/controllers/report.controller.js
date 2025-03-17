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
const getClientSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const clients = await reportService.getClientSalesReport(
      startDate,
      endDate
    );

    res.json(clients);
  } catch (error) {
    console.error(
      "Error en el controlador al obtener los clientes que más han gastado:",
      error
    );
    res.status(500).json({ error: "Error al obtener el reporte de clientes." });
  }
};
module.exports = {
  getCategorySalesReport,
  getCategorySalesReportWithProducts,
  getClientSalesReport,
};
