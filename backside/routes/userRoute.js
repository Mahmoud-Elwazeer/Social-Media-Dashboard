const express = require('express');
const userControllers = require('../controllers/usersController');
const authController = require('../controllers/authController');
const userValidator = require('../utils/validators/userValidator');

const router = express.Router();

router.route('/')
  .post(
    authController.auth_admin,
    userValidator.createUserValidatot,
    userControllers.createUser
  )
  .get(
    authController.auth_admin,
    userControllers.getUsers
  );


router.route('/:id')
  .get(
    authController.auth_user,
    userValidator.getUserByIdValidator,
    userControllers.getUserById
  )
  .put(
    authController.auth_admin,
    userValidator.updateUserValidator,
    userControllers.updateUserData
  )
  .delete(
    authController.auth_admin,
    userValidator.deleteUserValidator,
    userControllers.deleteUser
  );

module.exports = router;
