const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Post = require('../../models/postModel');
const docUtils = require('../docUtils');
const ApiError = require('../apiError');

const postValidator = {
  createPostValidator: [
    check().custom((val, { req }) => {
      if (!req.body.content && !req.body.images) {
        throw new Error('Post must have a content');
      }
      return true;
    }),
    validatorMiddleware,
  ],
  getPostByIdValidator: [
    check('id').isMongoId().withMessage('Invalid post Id'),
    validatorMiddleware,
  ],
  updatePostValidator: [
    check('id').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, { req }) => {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) throw new Error('Invalid post id');
      if (req.user._id.toString() !== post.userId.toString() && req.user.role !== 'admin') {
        throw new Error('unauthorized');
      }
      return true;
    }),
    validatorMiddleware,
  ],
  deletePostValidator: [
    check('id').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, { req }) => {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) throw new Error('Invalid post id');
      if (req.user._id.toString() !== post.userId.toString() && req.user.role !== 'admin') {
        throw new Error('unauthorized');
      }
      return true;
    }),
    validatorMiddleware,
  ],
  likePostValidator: [
    check('id').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, { req }) => {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) throw new Error('Invalid post id');
        if (post.likes.includes(req.user._id)) {
          throw new Error('You have already liked this post');
        }
        return true;
      }),
    validatorMiddleware,
  ],
  unlikePostValidator: [
    check('id').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, { req }) => {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) throw new Error('Invalid post id');
        if (!(post.likes.includes(req.user._id))) {
          throw new Error('You have already unliked this post');
        }
        return true;
      }),
    validatorMiddleware,
  ],
  getAllCommentsValidator: [
    check('id').isMongoId().withMessage('Invalid post Id'),
    validatorMiddleware,
  ],
  createCommentValidator: [
    check('id').isMongoId().withMessage('Invalid post Id'),
    validatorMiddleware,
  ],
  getCommentValidator: [
    check('id').isMongoId().withMessage('Invalid post Id'),
    check('commentId').isMongoId().withMessage('Invalid comment Id'),
    validatorMiddleware,
  ],
  updateCommentValidator: [
    check('content').notEmpty().withMessage('Content must be'),
    check('id').isMongoId().withMessage('Invalid post Id'),
    check('commentId').isMongoId().withMessage('Invalid comment Id')
      .custom(async (val, { req }) => {
        const { id, commentId } = req.params;
        const post = await Post.findById(id);
        if (!post) throw new Error('Invalid post id');
        const comment = post.comments.id(commentId);
        if (!comment) throw new Error('Invalid comment id');
        if (req.user._id.toString() !== comment.userId.toString() && req.user.role !== 'admin') {
          throw new Error('unauthorized');
        }
        return true;
      }),
    validatorMiddleware,
  ],

  deleteCommentValidator: [
    check('id').isMongoId().withMessage('Invalid post Id'),
    check('commentId').isMongoId().withMessage('Invalid comment Id')
      .custom(async (val, { req }) => {
        const { id, commentId } = req.params;
        const post = await Post.findById(id);
        if (!post) throw new Error('Invalid post id');
        const comment = post.comments.id(commentId);
        if (!comment) throw new Error('Invalid comment id');
        if (req.user._id.toString() !== comment.userId.toString() && req.user.role !== 'admin') {
          throw new Error('unauthorized');
        }
        return true;
      }),
    validatorMiddleware,
  ],
}

module.exports = postValidator;
