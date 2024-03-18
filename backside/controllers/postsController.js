const Post = require('../models/postModel');
const docUtils = require('../utils/docUtils');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

class postsController {
  static creatPost = asyncHandler(async(req, res, next) => {
    req.body.userId = req.user._id;
    const post = await docUtils.createDoc(Post, req.body);
    res.status(201).json({ data: post});
  });
}

module.exports = postsController;
