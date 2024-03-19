const Post = require('../models/postModel');
const docUtils = require('./docUtils');
const asyncHandler = require('express-async-handler');
const ApiError = require('./apiError');


class postUtils {
  static getComment = asyncHandler(async(req, next) => {
    const { id, commentId } = req.params;
    const post = await docUtils.getlDocById(Post, id, next);
    if (!post) return null;
    const comment = post.comments.id(commentId);
    if (!comment) {
      next(new ApiError('Not found', 404));
      return;
    }
    const obj = {
      post,
      comment
    }
    return obj;
  });
}

module.exports = postUtils;
