const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');
const ApiError = require('../../utils/apiError');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');

const authValidator = {
  signupValidator: [
    check('name').notEmpty().withMessage('Invalid Name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    check('email').trim().isEmail().withMessage('Invalid Email')
      .custom( async (email) => {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
          throw new Error('Email already in use');
        }
      }),
    check('password').notEmpty().isLength({ min: 3 }).withMessage('Invalid Password')
      .custom((password, { req }) => {
        if (password !== req.body.confirmPassword) {
          throw new Error('Password Confirmation incorrect');
        }
        return true;
      }),
    check('confirmPassword').notEmpty().withMessage('Invalid Password'),
    validatorMiddleware,
  ],

  signinValidator: [
    check('email').trim().isEmail().withMessage('Invalid Email'),
    check('password').notEmpty().isLength({ min: 3 }).withMessage('Invalid Email or  password'),
    validatorMiddleware,
  ],
}

module.exports = authValidator;
