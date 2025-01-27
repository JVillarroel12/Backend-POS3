const Category = require("../models/category.model");

const getAllCategories = async () => {
  return await Category.getAllCategories();
};
const getCategoryById = async (id) => {
  return await Category.getCategoryById(id);
};
const createCategory = async (categoryData) => {
  return await Category.createCategory(categoryData);
};
const updateCategory = async (id, categoryData) => {
  const category = await Category.updateCategory(id);
  if (!category) {
    return null;
  }
  await category.update(categoryData);
  return category;
};
const deleteCategory = async (id) => {
  const category = await Category.deleteCategory(id);
  if (!category) {
    return null;
  }
  await category.destroy();
  return true;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
