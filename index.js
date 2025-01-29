require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const categoriesRoutes = require("./src/routes/categories.routes");
const productRoutes = require("./src/routes/products.routes");
const clientRoutes = require("./src/routes/clients.routes");
const billRoutes = require("./src/routes/bills.routes");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/products", productRoutes);
app.use("/clients", clientRoutes);
app.use("/bills", billRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
