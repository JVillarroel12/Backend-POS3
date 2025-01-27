const { pool } = require("../config/db");

const getAllCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM CATEGORIES");
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM CATEGORIES WHERE CATEGORY_ID = ?",
    [id]
  );
  return rows[0];
};

const createCategory = async (categoryData) => {
  const { name, disabled, image_path } = categoryData;
  const [result] = await pool.query(
    "INSERT INTO CATEGORIES (NAME, DISABLED, IMAGE_PATH) VALUES (?, ?, ?)",
    [name, disabled, image_path]
  );
  return { CATEGORY_ID: result.insertId, ...categoryData };
};

const updateCategory = async (id, categoryData) => {
  const { NAME, DISABLED, IMAGE_PATH } = categoryData;
  const [result] = await pool.query(
    "UPDATE CATEGORIES SET NAME = ?, DISABLED = ?, IMAGE_PATH = ? WHERE CATEGORY_ID = ?",
    [NAME, DISABLED, IMAGE_PATH, id]
  );
  if (result.affectedRows === 0) {
    return null; // No se encontró la categoría para actualizar
  }
  return { CATEGORY_ID: id, ...categoryData };
};

const deleteCategory = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM CATEGORIES WHERE CATEGORY_ID = ?",
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
