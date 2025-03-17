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
        INNER JOIN products p ON com.product_id = p.product_id
        WHERE p.category_id = c.category_id
        AND com.bill_id IN (SELECT bill_id FROM bills WHERE invoiced = 1 AND DATE(date_creation) BETWEEN ? AND ?)
      ), 0) AS total,
      COALESCE(SUM(comandas.price_ref * comandas.qty), 0) +
      COALESCE((
        SELECT SUM(ca.price_ref * ca.qty) 
        FROM comanda_additionals ca
        INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
         INNER JOIN products p ON com.product_id = p.product_id
        WHERE p.category_id = c.category_id
        AND com.bill_id IN (SELECT bill_id FROM bills WHERE invoiced = 1 AND DATE(date_creation) BETWEEN ? AND ?)
      ), 0) AS total_ref,
      COALESCE(SUM(comandas.qty), 0) AS qty 
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
    qty: Number(row.qty),
  }));
};
const getClientSalesReport = async (startDate, endDate) => {
  const [rows] = await pool.query(
    `
    SELECT 
      c.client_id,
      c.name AS client_name,
      c.rif AS client_rif,
      DATE_FORMAT(b.date_creation, '%m-%d-%Y') AS sale_date,
      p.product_id,
      p.name AS product_name,
      COALESCE(SUM(comandas.qty), 0) AS total_qty,
      COALESCE(SUM(comandas.price * comandas.qty), 0) +   
      COALESCE((
        SELECT SUM(ca.price * ca.qty) 
        FROM comanda_additionals ca
        INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
        WHERE com.bill_id = b.bill_id AND com.product_id = p.product_id 
      ), 0) AS total_price,
      COALESCE(SUM(comandas.price_ref * comandas.qty), 0) +
      COALESCE((
        SELECT SUM(ca.price_ref * ca.qty) 
        FROM comanda_additionals ca
        INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
        WHERE com.bill_id = b.bill_id AND com.product_id = p.product_id 
      ), 0) AS total_price_ref
    FROM clients c
    LEFT JOIN bills b ON c.client_id = b.client_id
    LEFT JOIN comandas ON b.bill_id = comandas.bill_id
    LEFT JOIN products p ON comandas.product_id = p.product_id  -- Agregamos el JOIN con products
    WHERE b.invoiced = 1
    AND DATE(b.date_creation) BETWEEN ? AND ?
    GROUP BY c.client_id, c.name, c.rif, DATE_FORMAT(b.date_creation, '%m-%d-%Y'), p.product_id, p.name 
    ORDER BY DATE_FORMAT(b.date_creation, '%m-%d-%Y'), c.name, p.name
  `,
    [startDate, endDate]
  );

  // Transformar los resultados:
  const transformedResults = {};

  rows.forEach((row) => {
    const saleDate = row.sale_date;
    const clientId = row.client_id;

    if (!transformedResults[saleDate]) {
      transformedResults[saleDate] = {
        date: saleDate,
        clients: {}, // Cambiamos a un objeto para facilitar la búsqueda por client_id
      };
    }

    if (!transformedResults[saleDate].clients[clientId]) {
      transformedResults[saleDate].clients[clientId] = {
        client_id: row.client_id,
        name: row.client_name,
        rif: row.client_rif,
        products: [], // Inicializamos el array de productos
      };
    }

    transformedResults[saleDate].clients[clientId].products.push({
      product_id: row.product_id,
      name: row.product_name,
      qty: Number(row.total_qty),
      total: Number(row.total_price),
      total_ref: Number(row.total_price_ref),
    });
  });

  // Convertir el objeto en un array:
  const resultArray = Object.values(transformedResults).map((dateData) => ({
    date: dateData.date,
    clients: Object.values(dateData.clients), // Convertimos el objeto de clientes en un array
  }));

  return resultArray;
};
// const getClientSalesReport = async (startDate, endDate) => {
//   const [rows] = await pool.query(
//     `
//     SELECT
//       c.client_id,
//       c.name AS client_name,
//       c.rif AS client_rif,
//       COALESCE(SUM(comandas.price * comandas.qty), 0) +
//       COALESCE((
//         SELECT SUM(ca.price * ca.qty)
//         FROM comanda_additionals ca
//         INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
//         WHERE com.bill_id = b.bill_id
//         AND b.invoiced = 1
//         AND DATE(b.date_creation) BETWEEN ? AND ?
//       ), 0) AS total_price,
//       COALESCE(SUM(comandas.price_ref * comandas.qty), 0) +
//       COALESCE((
//         SELECT SUM(ca.price_ref * ca.qty)
//         FROM comanda_additionals ca
//         INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
//         WHERE com.bill_id = b.bill_id
//         AND b.invoiced = 1
//         AND DATE(b.date_creation) BETWEEN ? AND ?
//       ), 0) AS total_price_ref
//     FROM clients c
//     LEFT JOIN bills b ON c.client_id = b.client_id
//     LEFT JOIN comandas ON b.bill_id = comandas.bill_id
//     WHERE b.invoiced = 1
//     AND DATE(b.date_creation) BETWEEN ? AND ?
//     GROUP BY c.client_id, c.name, c.rif
//   `,
//     [startDate, endDate, startDate, endDate, startDate, endDate]
//   );

//   return rows.map((row) => ({
//     client_id: row.client_id,
//     name: row.client_name,
//     rif: row.client_rif,
//     total: Number(row.total_price),
//     total_ref: Number(row.total_price_ref),
//   }));
// };
const getCategorySalesReportWithProducts = async (startDate, endDate) => {
  const [categories] = await pool.query(`
    SELECT c.category_id, c.name
    FROM categories c
  `);

  const report = await Promise.all(
    categories.map(async (category) => {
      const [products] = await pool.query(
        `
        SELECT 
          p.product_id,
          p.name AS product_name,
          p.price,
          SUM(comandas.qty) AS qty,
          COALESCE(SUM(comandas.price * comandas.qty), 0) +
          COALESCE((
            SELECT SUM(ca.price * ca.qty)
            FROM comanda_additionals ca
            INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
            INNER JOIN bills b2 ON com.bill_id = b2.bill_id
            WHERE p.product_id = com.product_id
            AND b2.invoiced = 1
            AND DATE(b2.date_creation) BETWEEN ? AND ?
          ), 0) AS total,
          COALESCE(SUM(comandas.price_ref * comandas.qty), 0) +
          COALESCE((
            SELECT SUM(ca.price_ref * ca.qty)
            FROM comanda_additionals ca
            INNER JOIN comandas com ON ca.comanda_id = com.comanda_id
            INNER JOIN bills b2 ON com.bill_id = b2.bill_id
            WHERE p.product_id = com.product_id
            AND b2.invoiced = 1
            AND DATE(b2.date_creation) BETWEEN ? AND ?
          ), 0) AS total_ref
        FROM PRODUCTS p
        LEFT JOIN COMANDAS comandas ON p.product_id = comandas.product_id
        LEFT JOIN BILLS b ON comandas.bill_id = b.bill_id
        WHERE p.category_id = ?
        AND b.invoiced = 1
        AND DATE(b.date_creation) BETWEEN ? AND ?
        GROUP BY p.product_id, p.name, p.price
      `,
        [
          startDate,
          endDate,
          startDate,
          endDate,
          category.category_id,
          startDate,
          endDate,
        ]
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
  getClientSalesReport,
};
