const { pool } = require("../config/db");

const getCategorySalesReport = async (startDate, endDate) => {
  const [rows] = await pool.query(
    `
    SELECT 
      c.category_id,
      c.name,
      COALESCE(SUM(comandas.price * comandas.qty), 0) + 
      COALESCE((
        SELECT SUM(ca.price * ca.qty) 
        FROM comanda_additionals ca
        INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
        WHERE com.category_id = c.category_id
        AND b.invoiced = 1
        AND DATE(b.date_creation) BETWEEN ? AND ?
      ), 0) AS total,
      COALESCE(SUM(comandas.price_ref * comandas.qty), 0) +
      COALESCE((
        SELECT SUM(ca.price_ref * ca.qty) 
        FROM comanda_additionals ca
        INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
        WHERE com.category_id = c.category_id
        AND b.invoiced = 1
        AND DATE(b.date_creation) BETWEEN ? AND ?
      ), 0) AS total_ref
    FROM CATEGORIES c
    LEFT JOIN PRODUCTS p ON c.CATEGORY_ID = p.CATEGORY_ID
    LEFT JOIN COMANDAS comandas ON p.PRODUCT_ID = comandas.PRODUCT_ID
    LEFT JOIN BILLS b ON comandas.BILL_ID = b.BILL_ID
    WHERE b.invoiced = 1
    AND DATE(b.date_creation) BETWEEN ? AND ?
    GROUP BY c.CATEGORY_ID, c.NAME
  `,
    [startDate, endDate, startDate, endDate, startDate, endDate]
  );

  return rows.map((row) => ({
    ...row,
    total: Number(row.total),
    total_ref: Number(row.total_ref),
  }));
};
const getCategorySalesReportWithProducts = async (startDate, endDate) => {
  const [categories] = await pool.query(
    `
      SELECT c.category_id, c.name
      FROM categories c
      WHERE EXISTS (
        SELECT 1
        FROM products p
        INNER JOIN comandas comandas ON p.product_id = comandas.product_id
        INNER JOIN bills b ON comandas.bill_id = b.bill_id
        WHERE p.category_id = c.category_id
        AND b.invoiced = 1
        AND DATE(b.date_creation) BETWEEN ? AND ?
      )
    `,
    [startDate, endDate]
  );

  const report = await Promise.all(
    categories.map(async (category) => {
      const [products] = await pool.query(
        `
          SELECT 
            p.product_id,
            p.name AS product_name,
            p.price,
            SUM(comandas.qty) AS qty,
            COALESCE(SUM(comandas.price * comandas.qty), 0) AS total,
            COALESCE(SUM(comandas.price_ref * comandas.qty), 0) AS total_ref
          FROM products p
          LEFT JOIN comandas comandas ON p.product_id = comandas.product_id
          LEFT JOIN bills b ON comandas.bill_id = b.bill_id
          WHERE p.category_id = ?
          AND b.invoiced = 1
          AND DATE(b.date_creation) BETWEEN ? AND ?
          GROUP BY p.product_id, p.name, p.price
        `,
        [category.category_id, startDate, endDate]
      );

      return {
        ...category,
        products: products.map((product) => ({
          product_id: product.product_id,
          name: product.product_name,
          price: Number(product.price),
          qty: Number(product.qty),
          total: Number(product.total),
          total_ref: Number(product.total_ref),
        })),
      };
    })
  );

  return report;
};

module.exports = {
  getCategorySalesReport,
  getCategorySalesReportWithProducts,
};
