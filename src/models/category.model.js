const { pool } = require("../config/db");

const getAllCategories = async () => {
  const [categories] = await pool.query("select * from categories");

  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const [products] = await pool.query(
        `
        select 
            products.*
        from products
        where products.category_id = ?
        `,
        [category.category_id]
      );
      const mappedProducts = products.map((row) => {
        return {
          ...row,
          price: Number(row.price),
          price_ref: Number(row.price_ref),
        };
      });
      return {
        ...category,
        products: mappedProducts,
      };
    })
  );

  return categoriesWithProducts;
};

const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    "select * from categories where category_id = ?",
    [id]
  );
  return rows[0];
};

const createCategory = async (categoryData) => {
  const { name, active, image_path } = categoryData;
  const [result] = await pool.query(
    "insert into categories (name, active, image_path) values (?, ?, ?)",
    [name, active, image_path]
  );
  return { CATEGORY_ID: result.insertId, ...categoryData };
};

const updateCategory = async (id, categoryData) => {
  const { name, active, image_path } = categoryData;
  const [result] = await pool.query(
    "update categories set name = ?, active = ?, image_path = ? where category_id = ?",
    [name, active, image_path, id]
  );
  if (result.affectedRows === 0) {
    return null; // No se encontró la categoría para actualizar
  }
  return { CATEGORY_ID: id, ...categoryData };
};

const deleteCategory = async (id) => {
  const [result] = await pool.query(
    "delete from categories where category_id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
