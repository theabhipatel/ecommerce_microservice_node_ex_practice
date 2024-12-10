const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

const productModel = mongoose.model("Product", ProductSchema);

module.exports = {
  productModel,
};
