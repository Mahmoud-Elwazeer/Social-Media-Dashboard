const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');


function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}


// @desc 1- rules then validate
const userValidator = {
  createUserValidator: [
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
  getUserByIdValidator: [
    check('id').isMongoId().withMessage('Invalid user Id'),
    validatorMiddleware,
    ],
    updateUserValidator: [
    check('name')
    .custom((val, { req }) => {
      if (!val) return true;
      req.body.slug = slugify(val);
      return true;
    }),
    check('email')
      .custom((val, { req }) => {
        if (!val) return true;
        if (isValidEmail(val)) return true;
        throw new Error('Invalid Email')
      }),
    validatorMiddleware,
    ],
  deleteUserValidator: [
    check('id').isMongoId().withMessage('Invalid user Id'),
    validatorMiddleware,
    ],
}

module.exports = userValidator;
