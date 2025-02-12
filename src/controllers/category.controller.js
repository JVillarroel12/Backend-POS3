const categoryService = require("../services/categories.service");
const path = require("path");
const fs = require("fs");
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, active, createdby, updatedby, image_path } = req.body;
    let imageName = null;

    if (image_path) {
      // Generar el nombre del archivo usando el category_id
      imageName = `${Date.now()}.jpg`;

      // Remover el prefijo 'data:image/png;base64,' o similar
      const base64Image = image_path.split(";base64,").pop();

      // Crear la ruta completa al archivo
      const uploadPath = path.join(
        __dirname,
        "../../img/categories",
        imageName
      );

      // Guardar el archivo
      fs.writeFile(
        uploadPath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          if (err) {
            console.log("Error creating file", err);
          }
          console.log("File created");
        }
      );
    }

    const newCategory = await categoryService.createCategory({
      name,
      active,
      createdby,
      updatedby,
      image_path: imageName,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error in createCategory controller", error);
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { name, active, createdby, updatedby, image_path } = req.body;
    let imageName = null;
    if (image_path) {
      imageName = `${categoryId}.jpg`;

      // Remover el prefijo 'data:image/png;base64,' o similar
      const base64Image = image_path.split(";base64,").pop();

      // Crear la ruta completa al archivo
      const uploadPath = path.join(
        __dirname,
        "../../img/categories",
        imageName
      );

      // Guardar el archivo
      fs.writeFile(
        uploadPath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          if (err) {
            console.log("Error creating file", err);
          }
          console.log("File created");
        }
      );
    }

    const updatedCategory = await categoryService.updateCategory(categoryId, {
      name,
      active,
      createdby,
      updatedby,
      image_path: imageName,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error in updateCategory controller", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    await categoryService.deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
