const express = require('express');
const userControllers = require('../controllers/usersController');
const { check, validationResult } = require('express-validator');
const userValidator = require('../utils/validators/userValidator');

const router = express.Router();

router.route('/')
  .post(userValidator.createUserValidatot, userControllers.createUser)
  .get(userControllers.getUsers);


router.route('/:id')
  .get( userValidator.getUserByIdValidator, userControllers.getUserById)
  .put(userValidator.updateUserValidator, userControllers.updateUserData)
  .delete(userValidator.deleteUserValidator, userControllers.deleteUser);

router.route('/changePassword/:id')
  .get(userValidator.changePasswordValidator, userControllers.changePassword)

module.exports = router;
