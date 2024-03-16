const mongoose = require('mongoose');

// Schema
const user = new mongoose.Schema(
  {
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  // A and B => x.com/a-and-b using for frontend
  slug: {
    type: String,
    lowercase: true,
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'Email required'],
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
  active: {
    type: Boolean,
    default: true,
  },
  profileImage: String,
  bio: String,
  location: String,
  dateOfBirth: String,
  },
  // create two fields in db (createdat and updatedat) for time
  { timestamps: true }
);

const User = mongoose.model('users', user);

module.exports = User;
