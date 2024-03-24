const mongoose = require('mongoose');

const page = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  admins: [{
    type:  mongoose.Schema.ObjectId,
    ref: 'users'
  }],
  followers: [{
    type:  mongoose.Schema.ObjectId,
    ref: 'users'
  }],
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'posts',
  }],
  description: String,
  pageImage: String,
  },
  { timestamps: true},
) 

const Page = mongoose.model('pages', page);

module.exports = Page;
