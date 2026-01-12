const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSChema = new Schema(
  {
    FirstName: String,
    LastName: String,
    Email: String,
    Age: String,
    Country: String,
    Gender: String,
    Telephone: String,
  },
  { timestamps: true }
);

const User = mongoose.model("Customer", CustomerSChema);

module.exports = User;
