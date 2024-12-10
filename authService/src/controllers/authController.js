const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");
const config = require("../config");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: "30d",
    });
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
