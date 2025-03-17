const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

router.post("/category-sales", reportController.getCategorySalesReport);
router.post(
  "/category-sales-products",
  reportController.getCategorySalesReportWithProducts
);
router.post("/sales-by-client", reportController.getClientSalesReport);
module.exports = router;
