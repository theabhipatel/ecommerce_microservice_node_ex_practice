const express = require("express");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const redis = require("redis");
const config = require("./config");

const redisClient = redis.createClient({ port: config.redisPort });

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to Ecommerce Auth Service" });
});

app.use("/auth", authRoutes);

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error(err));

app.listen(3001, () => {
  console.log("Auth Service running on http://127.0.0.1:3001");
});
