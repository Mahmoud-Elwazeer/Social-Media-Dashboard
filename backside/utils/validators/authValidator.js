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

  loginValidator: [
    check('email').trim().isEmail().withMessage('Invalid Email'),
    check('password').notEmpty().isLength({ min: 3 }).withMessage('Invalid Email or  password'),
    validatorMiddleware,
  ],

  changePasswordValidator: [
    check('currentPassword').notEmpty().withMessage('Enter Current password'),
    check('password').notEmpty().isLength({ min: 3 }).withMessage('Enter New password')
      .custom(async (password, { req }) => {
        if (!req.user) {
          throw new Error('There is no user for this id');
        }
        const isCorrect = await bcrypt.compare(
          req.body.currentPassword,
          req.user.password
        );
        if (!isCorrect) {
          throw new Error('Incorrect Current Password');
        }
        if (password !== req.body.confirmPassword) {
          throw new Error('Password Confirmation incorrect');
        }
        return true;
      }),
    check('confirmPassword').notEmpty().withMessage('Invalid Password'),
    validatorMiddleware,
  ],
}

module.exports = authValidator;
