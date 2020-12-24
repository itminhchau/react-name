const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});



module.exports = mongoose.model("Book", userSchema);