const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    trim: true, // remove any space or tabs
    required: [true, 'Email required'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    // minlength: [8, 'Too short password'],
  },
  passwordChangedAt: Date,
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

user.pre('save', async function(next) {
  // Hashing for user password
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

const User = mongoose.model('users', user);

module.exports = User;
