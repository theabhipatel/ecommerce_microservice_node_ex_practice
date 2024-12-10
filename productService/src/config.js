require("dotenv").config();

module.exports = {
  mongoUrl: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  redisPort: process.env.REDIS_PORT || 6379,
};
