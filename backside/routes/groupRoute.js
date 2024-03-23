const express = require('express');
const authController = require('../controllers/authController');
const groupControllers = require('../controllers/groupControllers'); 
const groupValidator = require('../utils/validators/groupValidator');
const postValidator = require('../utils/validators/postValidator');

const router = express.Router();

router.route('/')
  .post(
    authController.auth_user,
    groupValidator.createGroupValidator,
    groupControllers.createGroup,
  )
  .get(
    authController.auth_user,
    groupControllers.getAllGroups,
  )

router.route('/me')
  .get(
    authController.auth_user,
    groupControllers.getGroups,
  )

router.route('/:id')
  .get(
    authController.auth_user,
    groupValidator.getGroupByIdValidator,
    groupControllers.getGroupById,
  )
  .put(
    authController.auth_user,
    groupValidator.updateGroupValidator,
    groupControllers.updateGroup,
  )
  .delete(
    authController.auth_user,
    groupValidator.updateGroupValidator,
    groupControllers.deleteGroup,
  )

router.route('/:id/members')
  .get(
    authController.auth_user,
    groupValidator.groupValidator,
    groupControllers.getAllmembers,
  )

router.route('/:id/members/:userId')
  .post(
    authController.auth_user,
    groupValidator.addUserToGroupValidator,
    groupControllers.addUserToGroup,
  )
  .delete(
    authController.auth_user,
    groupValidator.deleteUserFromGroupValidator,
    groupControllers.deleteUserFromGroup,
  )

router.route('/:id/posts')
  .get(
    authController.auth_user,
    groupValidator.groupValidator,
    groupControllers.getAllPosts,
  )
  .post(
    authController.auth_user,
    groupValidator.groupValidator,
    postValidator.createPostValidator,
    groupControllers.addPostToGroup,
  )

router.route('/:id/posts/:postId')
  .get(
    authController.auth_user,
    groupValidator.groupValidator,
    groupControllers.getPostFromGroup,
  )

module.exports = router
