const productService = require("../services/products.service");
const path = require("path");
const fs = require("fs");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      price,
      price_ref,
      active,
      name,
      use_additional,
      description,
      image_path,
    } = req.body;
    let imageName = null;

    if (image_path) {
      // Generar el nombre del archivo usando el category_id
      imageName = `${Date.now()}.jpg`;

      // Remover el prefijo 'data:image/png;base64,' o similar
      const base64Image = image_path.split(";base64,").pop();

      // Crear la ruta completa al archivo
      const uploadPath = path.join(__dirname, "../../img/products", imageName);

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

    const newProduct = await productService.createProduct({
      category_id,
      image_path: imageName,
      price,
      price_ref,
      active,
      name,
      use_additional,
      description,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in createProduct controller", error);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const {
      category_id,
      image_path,
      price,
      price_ref,
      active,
      name,
      use_additional,
      description,
    } = req.body;
    let imageName = null;

    if (image_path) {
      // Generar el nombre del archivo usando el productId
      imageName = `${productId}.jpg`;

      // Remover el prefijo 'data:image/png;base64,' o similar
      const base64Image = image_path.split(";base64,").pop();

      // Crear la ruta completa al archivo
      const uploadPath = path.join(__dirname, "../../img/products", imageName);

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

    const updatedProduct = await productService.updateProduct(productId, {
      category_id,
      image_path: imageName,
      price,
      price_ref,
      active,
      name,
      use_additional,
      description,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error in updateProduct controller", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deleted = await productService.deleteProduct(productId);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
