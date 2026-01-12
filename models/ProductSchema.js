const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  Productname: String,
  Stock: String,
  Price: String,
});
const product = mongoose.model("Product", ProductSchema);
module.exports = product;
