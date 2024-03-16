const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


// @desc 1- rules then validate
const userValidator = {
  createUserValidatot: [
    check('name').notEmpty().withMessage('Name required'),
    check('email').trim().isEmail(),
    check('password').notEmpty().isLength({ min: 3 }),
    validatorMiddleware,
  ],
  getUserByIdValidator: [
    check('id').isMongoId().withMessage('Invalid user Id'),
    validatorMiddleware,
    ],
    updateUserValidator: [
    check('id').isMongoId().withMessage('Invalid user Id'),
    validatorMiddleware,
    ],
    deleteUserValidator: [
      check('id').isMongoId().withMessage('Invalid user Id'),
      validatorMiddleware,
      ],
}

module.exports = userValidator;

