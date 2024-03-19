const mongoose = require('mongoose');

// Schema
const post = new mongoose.Schema ({
  content: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: [true, 'Post must be have a user']
    },
  images: [String],
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    likes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    }],
  }],
  },
  { timestamps: true},
);

const Post = mongoose.model('posts', post);

module.exports = Post;
