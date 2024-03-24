const mongoose = require('mongoose');

const group = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  members: [{
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
  }],
  requests: [{
    type:  mongoose.Schema.ObjectId,
    ref: 'users'
  }],
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'posts',
  }],
  description: String,
  groupImage: String,
  },
  { timestamps: true },
)

const Group = mongoose.model('groups', group);

module.exports = Group;
