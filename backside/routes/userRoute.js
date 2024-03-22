const express = require('express');
const userControllers = require('../controllers/usersController');
const authController = require('../controllers/authController');
const userValidator = require('../utils/validators/userValidator');

const router = express.Router();

router.route('/')
  .post(
    authController.auth_admin,
    userValidator.createUserValidator,
    userControllers.createUserByAdmin
  )
  .get(
    authController.auth_user,
    userControllers.getUsersByAdmin
  );

router.route('/me')
  .get(
    authController.auth_user,
    userControllers.getUserById
  )
  .put(
    authController.auth_user,
    userValidator.updateUserValidator,
    userControllers.updateUserData
  )
  .delete(
    authController.auth_user,
    userControllers.deleteUser
  );

router.route('/:id')
  .get(
    authController.auth_user,
    userValidator.getUserByIdValidator,
    userControllers.getUserByIdByAdmin
  )
  .put(
    authController.auth_admin,
    userValidator.updateUserValidator,
    userControllers.updateUserByAdmin
  )
  .delete(
    authController.auth_admin,
    userValidator.deleteUserValidator,
    userControllers.deleteUserByAdmin
  );


module.exports = router;
