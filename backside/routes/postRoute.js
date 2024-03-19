const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const postValidator = require('../utils/validators/postValidator');

const router = express.Router();

router.route('/')
  .post(
    authController.auth_user,
    postValidator.createPostValidator,
    postsController.creatPost,
  )
  .get(
    authController.auth_user,
    postsController.getAllPosts,
  )

router.route('/me')
  .get(
    authController.auth_user,
    postsController.getPosts,
  )

router.route('/:id')
  .get(
  authController.auth_user,
  postValidator.getPostByIdValidator,
  postsController.getPostById,
  )
  .put(
    authController.auth_user,
    postValidator.updatePostValidator,
    postsController.updatePost,
  )
  .delete(
    authController.auth_user,
    postValidator.deletePostValidator,
    postsController.deletePost,
  )

router.route('/:id/like')
  .post(
    authController.auth_user,
    postValidator.likePostValidator,
    postsController.likePost,
  )
  .delete(
    authController.auth_user,
    postValidator.unlikePostValidator,
    postsController.unlikePost,
  )

router.route('/:id/comments')
  .get(
    authController.auth_user,
    postValidator.getAllCommentsValidator,
    postsController.getAllcomments,
  )
  .post(
    authController.auth_user,
    postValidator.createCommentValidator,
    postsController.createComment,
  )

router.route('/:id/comments/:commentId')
  .get(
    authController.auth_user,
    postValidator.getCommentValidator,
    postsController.getComment,
  )
  .put(
    authController.auth_user,
    postValidator.updateCommentValidator,
    postsController.updateComment,
  )
  .delete(
    authController.auth_user,
    postValidator.deleteCommentValidator,
    postsController.deleteComment,
  )


router.route('/:id/comments/:commentId/like')
  .post(
    authController.auth_user,
    postValidator.likeCommentValidator,
    postsController.likeComment,
  )
  .delete(
    authController.auth_user,
    postValidator.unlikeCommentValidator,
    postsController.unlikeComment,
  )

module.exports = router;
