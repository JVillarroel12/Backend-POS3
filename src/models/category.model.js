const { pool } = require("../config/db");
const fs = require("fs").promises;
const path = require("path");

const getAllCategories = async () => {
  const [categories] = await pool.query("select * from categories");

  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      let imageBase64 = null;
      if (category.image_path) {
        try {
          const imagePath = path.join(
            __dirname,
            "../../img/categories",
            category.image_path
          );
          const imageBuffer = await fs.readFile(imagePath);
          imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString(
            "base64"
          )}`;
        } catch (error) {
          console.error(
            `Error reading image for category ${category.category_id}:`,
            error
          );
        }
      }
      const [products] = await pool.query(
        `
        select 
            products.*
        from products
        where products.category_id = ?
        `,
        [category.category_id]
      );
      const mappedProducts = await Promise.all(
        products.map(async (row) => {
          let productImageBase64 = null;
          if (row.image_path) {
            try {
              const imagePath = path.join(
                __dirname,
                "../../img/products",
                row.image_path
              );
              const imageBuffer = await fs.readFile(imagePath);
              productImageBase64 = `data:image/jpeg;base64,${imageBuffer.toString(
                "base64"
              )}`;
            } catch (error) {
              console.error(
                `Error reading image for product ${row.product_id}:`,
                error
              );
            }
          }

          return {
            ...row,
            price: Number(row.price),
            price_ref: Number(row.price_ref),
            qty: Number(row.qty),
            image: productImageBase64,
          };
        })
      );

      return {
        ...category,
        image: imageBase64,
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
  return { category_id: id, ...categoryData };
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
