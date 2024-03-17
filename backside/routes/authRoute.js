const express = require('express');
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const authValidator = require('../utils/validators/authValidator');

const router = express.Router();

router.route('/signup')
  .post(authValidator.signupValidator, authController.signup);

router.route('/signin')
  .post(authValidator.signinValidator, authController.signin);

module.exports = router;
