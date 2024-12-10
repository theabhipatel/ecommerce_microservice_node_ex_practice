const jwt = require("jsonwebtoken");
const redis = require("redis");
const config = require("../config");

const redisClient = redis.createClient({ port: config.redisPort });

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  jwt.verify(token, config.jwtSecret, async (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    redisClient.get(user.id, (err, result) => {
      if (err || !result)
        return res.status(403).json({ message: "Access denied" });
      req.user = user;
      next();
    });
  });
};
