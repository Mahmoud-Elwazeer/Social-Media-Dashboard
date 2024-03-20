const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Friend = require('../../models/friendModel');
const User = require('../../models/userModel');

const friendValidator = {
  sendRequestValidator: [
    check('userId').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, {req}) => {
        if (val === req.user._id.toString()) {
          throw new Error('You can\'t send friendship for yourself');
        }
        const user = await User.findById(val);
        if (!user) {
          throw new Error('User not found');
        }
        const existfriend = await Friend.findOne({
          $or: [
            { user1: req.user._id, user2: val },
            { user1: val, user2: req.user._id },
          ]
        })
        if (existfriend) {
          throw new Error('friendship already exists');
        }
        return true;
      }),
    validatorMiddleware,
  ],

  statusRequestValidator: [
    check('friendshipId').isMongoId().withMessage('Invalid post Id'),
    validatorMiddleware,
  ]
}

module.exports = friendValidator;
