const express = require('express');
const authController = require('../controllers/authController');
const groupControllers = require('../controllers/groupControllers'); 
const groupValidator = require('../utils/validators/groupValidator');

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

module.exports = router
