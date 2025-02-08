const { pool } = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await pool.query(`
      SELECT 
          products.*,
          categories.category_id as category_category_id,
          categories.name as category_name,
          categories.active as category_active,
          categories.image_path as category_image_path
      FROM products
      INNER JOIN categories ON products.category_id = categories.category_id
    `);
  return rows
    .map((row) => {
      return {
        ...row,
        price: Number(row.price),
        price_ref: Number(row.price_ref),
        qty: Number(row.qty),
        use_additional: Boolean(row.use_additional),
        description: row.description,
        category: {
          category_id: row.category_category_id,
          name: row.category_name,
          active: row.category_active,
          image_path: row.category_image_path,
        },
      };
    })
    .map((row) => {
      const {
        category_category_id,
        category_name,
        category_active,
        category_image_path,
        ...productdata
      } = row;
      return productdata;
    });
};

const getProductById = async (id) => {
  const [rows] = await pool.query(
    `
      SELECT 
          products.*,
          categories.category_id as category_category_id,
          categories.name as category_name,
          categories.active as category_active,
          categories.image_path as category_image_path
      FROM products
      INNER JOIN categories ON products.category_id = categories.category_id
      WHERE products.product_id = ?
    `,
    [id]
  );
  if (!rows || rows.length === 0) {
    return null;
  }
  const row = rows[0];
  return {
    ...row,
    price: Number(row.price),
    price_ref: Number(row.price_ref),
    use_additional: Boolean(row.use_additional),
    description: row.description,
    category: {
      category_id: row.category_category_id,
      name: row.category_name,
      active: row.category_active,
      image_path: row.category_image_path,
    },
  };
};

const createProduct = async (productData) => {
  const {
    category_id,
    image_path,
    price,
    price_ref,
    active,
    name,
    use_additional,
    description,
  } = productData;
  const [result] = await pool.query(
    "INSERT INTO products (category_id, image_path, price, price_ref, active, name, use_additional, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      category_id,
      image_path,
      price,
      price_ref,
      active,
      name,
      use_additional,
      description,
    ]
  );
  return { PRODUCT_ID: result.insertId, ...productData };
};

const updateProduct = async (id, productData) => {
  const {
    category_id,
    image_path,
    price,
    price_ref,
    active,
    name,
    use_additional,
    description,
  } = productData;
  const [result] = await pool.query(
    "UPDATE products SET category_id = ?, image_path = ?, price = ?, price_ref = ?, active = ?, name = ?, use_additional = ?, description = ? WHERE product_id = ?",
    [
      category_id,
      image_path,
      price,
      price_ref,
      active,
      name,
      use_additional,
      description,
      id,
    ]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return { PRODUCT_ID: id, ...productData };
};

const deleteProduct = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM products WHERE product_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
