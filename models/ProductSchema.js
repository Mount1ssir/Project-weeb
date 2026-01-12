const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const ProductSchema = new Schema({
  Productname: String,
  Stock: String,
  Price: String,
});

// Create a model based on that schema
const product = mongoose.model("Product", ProductSchema);

// export the model
module.exports = product; // sdrht 4ila ofihas assis khdmh h app.js
