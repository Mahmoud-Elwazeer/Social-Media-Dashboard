const mongoose = require('mongoose');

const friend = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: true,
    },
  user2: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: true,
    },
  status: {
    type: String,
    enum: ['pending', 'accepted','rejected'],
    default: 'pending',
    required: true,
    },
  },
  { timestamps: true },
)

const Friend = mongoose.model('friends', friend);

module.exports = Friend;
