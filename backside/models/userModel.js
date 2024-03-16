const mongoose = require('mongoose');

// Schema
const user = new mongoose.Schema({
  name: String,
  phone: String,
});

const User = mongoose.model('users', user);

module.exports = User;
