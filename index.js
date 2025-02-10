require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { initIO, getIO } = require("./socket");

const app = express();

const categoriesRoutes = require("./src/routes/categories.routes");
const productRoutes = require("./src/routes/products.routes");
const clientRoutes = require("./src/routes/clients.routes");
const currencyRoutes = require("./src/routes/currencies.routes");
const billRoutes = require("./src/routes/bills.routes");
const modifierRoutes = require("./src/routes/modifiers.routes");
const stationRoutes = require("./src/routes/stations.routes");
const paymentMethodRoutes = require("./src/routes/payment_methods.routes");
const conversionRoutes = require("./src/routes/conversion.routes");
const comandaRoutes = require("./src/routes/comandas.routes");
const zoneRoutes = require("./src/routes/zones.routes");
const tableRoutes = require("./src/routes/tables.routes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/products", productRoutes);
app.use("/clients", clientRoutes);
app.use("/bills", billRoutes);
app.use("/modifiers", modifierRoutes);
app.use("/stations", stationRoutes);
app.use("/currencies", currencyRoutes);
app.use("/payment-methods", paymentMethodRoutes);
app.use("/conversions", conversionRoutes);
app.use("/comandas", comandaRoutes);
app.use("/zones", zoneRoutes);
app.use("/tables", tableRoutes);

const server = http.createServer(app);
initIO(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
