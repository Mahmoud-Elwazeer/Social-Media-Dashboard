const express = require('express');
const pageControllers = require('../controllers/pageControllers');
const authController = require('../controllers/authController');
const pageValidator = require('../utils/validators/pageValidator');
const postValidator = require('../utils/validators/postValidator');

const router = express.Router();

router.route('/')
  .post(
    authController.auth_user,
    pageValidator.createPageValidator,
    pageControllers.createPage,
  )
  .get(
    authController.auth_user,
    pageControllers.getAllPages,
  )

router.route('/me')
  .get(
    authController.auth_user,
    pageControllers.getPages,
  )

router.route('/:id')
  .get(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.getPageById,
  )
  .put(
    authController.auth_user,
    pageValidator.updatePageValidator,
    pageControllers.updatePage,
  )
  .delete(
    authController.auth_user,
    pageValidator.updatePageValidator,
    pageControllers.deletePage,
  )

router.route('/:id/admins')
  .get(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.getAllAdmins,
  )

router.route('/:id/admins/:adminId')
  .post(
    authController.auth_user,
    pageValidator.addAdminToPageValidator,
    pageControllers.addAdminToPage,
  )
  .delete(
    authController.auth_user,
    pageValidator.deleteAdminFromPageValidator,
    pageControllers.deleteAdminFromPage
  )

router.route('/:id/followers')
  .get(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.getAllFollowers,
  )
  .post(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.addFollowerToPage,
  )

router.route('/:id/followers/:followerId')
  .delete(
    authController.auth_user,
    pageValidator.deleteFollowerFromPageValidator,
    pageControllers.deleteFollowerFromPage,
  )


router.route('/:id/posts')
  .get(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.getAllPosts,
  )
  .post(
    authController.auth_user,
    pageValidator.pageValidator,
    pageValidator.checkAuthForPage,
    postValidator.createPostValidator,
    pageControllers.addPostToPage,
  )

router.route('/:id/posts/:postId')
  .get(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.getPostFromPage,
  )
  .put(
    authController.auth_user,
    pageValidator.checkAuthForPage,
    pageControllers.updatePostFromPage,
  )
  .delete(
    authController.auth_user,
    pageValidator.checkAuthForPage,
    pageControllers.deletePostFromPage,
  )


module.exports = router;
