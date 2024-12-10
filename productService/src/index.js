const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const redis = require("redis");
const config = require("./config");

mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const redisClient = redis.createClient({ port: config.redisPort });

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to Ecommerce Product Service" });
});

app.use("/products", productRoutes);

app.listen(3002, () => {
  console.log("Product Service running on http://127.0.0.1:3002");
});
