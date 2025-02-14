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
const userRoutes = require("./src/routes/users.routes");
const profileRoutes = require("./src/routes/profiles.routes");
const userActionRoutes = require("./src/routes/user_actions.routes");
const profileActionRoutes = require("./src/routes/profile_actions.routes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
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
app.use("/users", userRoutes);
app.use("/profiles", profileRoutes);
app.use("/user-actions", userActionRoutes);
app.use("/profile-actions", profileActionRoutes);
const server = http.createServer(app);
initIO(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
