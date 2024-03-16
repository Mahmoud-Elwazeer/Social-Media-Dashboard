const mongoose = require('mongoose');

// Schema
const user = new mongoose.Schema(
  {
  firstName: {
    type: String,
    required: [true, 'First Name required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name required'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    // minlength: [8, 'Too short password'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // profileImage: String,
  active: {
    type: Boolean,
    default: true,
  },
  // A and B => x.com/a-and-b using for frontend
  slug: {
    type: String,
    lowercase: true,
  }
  },
  // create two fields in db (createdat and updatedat) for time
  { timestamps: true }
);

const User = mongoose.model('users', user);

module.exports = User;
