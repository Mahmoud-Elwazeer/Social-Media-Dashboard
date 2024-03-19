const Post = require('../models/postModel');
const docUtils = require('../utils/docUtils');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require('mongoose');
// const ApiError = require('../utils/apiError');

const ObjectId = mongoose.Types.ObjectId;

class postsController {
  // @desc create post
  // @route POST /api/v1/posts
  // @access public
  static creatPost = asyncHandler(async(req, res, next) => {
    req.body.userId = req.user._id;
    const post = await docUtils.createDoc(Post, req.body);
    res.status(201).json({ data: post});
  });

  // @desc get list for all posts for user
  // @route GET /api/v1/posts/me
  // @access public
  static getPosts = asyncHandler(async(req, res) => {
    const { docs, page } = await docUtils.getDocs(Post, { userId: req.user._id }, req);
    res.status(200).json({ results: docs.length, page, data: docs});
  });

  // @desc get list for all posts for user
  // @route GET /api/v1/posts
  // @access public
  static getAllPosts = asyncHandler(async(req, res) => {
    const posts = await docUtils.getDocs(Post, {}, req);
    res.status(200).json({ 
      results: posts.docs.length, page: posts.page, data: posts.docs
    });
  });

  // @desc get specific post
  // @route GET /api/v1/posts/:id
  // @access public
  static getPostById = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const post = await docUtils.getlDocById(Post, id, next);
    if (!post) return;
    res.status(200).json({ data: post});
  });

  // @desc update specific post
  // @route PUT /api/v1/posts/:id
  // @access public
  static updatePost = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const post = await docUtils.updateDoc(Post, id, req.body, next);
    if (!post) return;
    res.status(200).json({ data: post});
  });

  // @desc delete specific post
  // @route DELETE /api/v1/posts/:id
  // @access public
  static deletePost = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const post = await docUtils.deleteDoc(Post, id, next);
    if (!post) return;
    res.status(204).send();
  });

  // @desc Like a post.
  // @route POST /api/v1/posts/:id/like
  // @access public
  static likePost = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const query = { $push: { 'likes': userId } };
    const post = await docUtils.updateDoc(Post, id, query, next);
    if (!post) return;
    res.status(200).json({ data: post});
  });

  // @desc unlike a post.
  // @route DELETE /api/v1/posts/:id/like
  // @access public
  static unlikePost = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const query = { $pull: { 'likes': userId } };
    const post = await docUtils.updateDoc(Post, id, query, next);
    if (!post) return;
    res.status(200).json({ data: post});
  });

  // @desc get all comments for specific post
  // @route GET /api/v1/posts/:id/comments
  // @access public
  static getAllcomments = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const post = await docUtils.getlDocById(Post, id, next);
    if (!post) return;
    res.status(200).json({ data: post.comments });
  });

  // @desc add a comment for post.
  // @route POST /api/v1/posts/:id/comments
  // @access public
  static createComment = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    req.body.userId = req.user._id.toString();
    const query = { $push: { 'comments': req.body } };
    const post = await docUtils.updateDoc(Post, id, query, next);
    if (!post) return;
    res.status(200).json({ data: post.comments });
  });

  // @desc GET a specific comment for post.
  // @route GET /api/v1/posts/:id/comments/:commentId
  // @access public
  static getComment = asyncHandler(async(req, res, next) => {
    const { id, commentId } = req.params;
    const post = await docUtils.getlDocById(Post, id, next);
    if (!post) return;
    const comment = post.comments.id(commentId);
    if (!comment) {
      next(new ApiError('Not found', 404));
      return;
    }
    res.status(200).json({ data: comment });
  });

  // @desc update a specific comment for post.
  // @route PUT /api/v1/posts/:id/comments/:commentId
  // @access public
  static updateComment = asyncHandler(async(req, res, next) => {
    const { id, commentId } = req.params;
    const { content } = req.body;
    const post = await docUtils.getlDocById(Post, id, next);
    if (!post) return;
    const comment = post.comments.id(commentId);
    if (!comment) {
      next(new ApiError('Not found', 404));
      return;
    }
    // Update the content of the comment
    comment.content = content;
    await post.save();
    res.status(200).json({ data: comment });
  });

  // @desc delete a specific comment for post.
  // @route DELETE /api/v1/posts/:id/comments/:commentId
  // @access public
  static deleteComment = asyncHandler(async(req, res, next) => {
    const { id, commentId } = req.params;
    const query = { $pull: { 'comments': { _id: commentId } } };
    const post = await docUtils.updateDoc(Post, id, query, next);
    if (!post) return;
    res.status(204).send();
  });
}

module.exports = postsController;
