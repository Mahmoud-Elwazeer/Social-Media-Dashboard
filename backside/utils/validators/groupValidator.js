const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');
const Group = require('../../models/groupModel');
const docUtils = require('../docUtils');

const groupValidator = {
  createGroupValidator: [
    check('name').notEmpty().withMessage('Invalid Name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  ],
  getGroupByIdValidator: [
    check('id').isMongoId().withMessage('Invalid Group Id'),
    validatorMiddleware,
  ],
  updateGroupValidator: [
    check('name')
    .custom((val, { req }) => {
      if (!val) return true;
      req.body.slug = slugify(val);
      return true;
    }),
    check('id').isMongoId().withMessage('Invalid Group Id')
      .custom(async (val, { req }) => {
        const { id } = req.params;
        const group = await Group.findById(id);
        if (!group) throw new Error('Invalid group id');
        const user = group.members.find(member => member.userId.toString() === req.user._id.toString());
        if (!user && req.user.role !== 'admin') throw new Error('Not found');
        if (req.user.role !== 'admin') {
          if (user.role !== 'admin')
            throw new Error('unauthorized');
        }
      return true;
    }),
    validatorMiddleware,
  ],
}

module.exports = groupValidator;
