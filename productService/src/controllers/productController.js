const { productModel } = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Products fetched successfully",
      product,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
