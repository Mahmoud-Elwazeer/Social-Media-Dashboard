const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../utils/validators/authValidator');

const router = express.Router();

router.route('/signup')
  .post(authValidator.signupValidator, authController.signup);

router.route('/login')
  .post(authValidator.loginValidator, authController.login);

router.route('/changePassword/me')
  .put(
    authController.auth_user,
    authValidator.changePasswordValidator,
    authController.changePassword
  )

router.route('/changePassword/:id')
  .put(
    authController.auth_admin,
    // authValidator.changePasswordValidator,
    authController.changePasswordByAdmin
  )

module.exports = router;
