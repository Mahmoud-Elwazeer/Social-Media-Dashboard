const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');
const Group = require('../../models/groupModel');
const Post = require('../../models/postModel');
const docUtils = require('../docUtils');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

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
        if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
        if (req.user.role !== 'admin') {
          if (user.role !== 'admin')
            throw new Error('unauthorized');
        }
      return true;
    }),
    validatorMiddleware,
  ],
  groupValidator: [
    check('id').isMongoId().withMessage('Invalid Group Id'),
    validatorMiddleware,
  ],
  addUserToGroupValidator: [
    check('userId').isMongoId().withMessage('Invalid user Id'),
    check('id').isMongoId().withMessage('Invalid Group Id')
      .custom(async (val, { req }) => {
      const { id, userId } = req.params;
      const group = await Group.findById(id);
      if (!group) throw new Error('Invalid group id');
      let user = group.members.find(member => member.userId.toString() === userId.toString());
      if (user) throw new Error('You have already in group')
      user = group.members.find(member => member.userId.toString() === req.user._id.toString());
      if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
      if (req.user.role !== 'admin') {
        if (user.role !== 'admin')
          throw new Error('unauthorized');
      }
    return true;
      }),
    validatorMiddleware,
  ],

  deleteUserFromGroupValidator: [
    check('userId').isMongoId().withMessage('Invalid user Id'),
    check('id').isMongoId().withMessage('Invalid Group Id')
      .custom(async (val, { req }) => {
      const { id, userId } = req.params;
      const group = await Group.findById(id);
      if (!group) throw new Error('Invalid group id');
      let user = group.members.find(member => member.userId.toString() === userId.toString());
      if (!user) throw new Error('You aren\'t in this group')
      user = group.members.find(member => member.userId.toString() === req.user._id.toString());
      if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
      if (req.user.role !== 'admin') {
        if (user.role !== 'admin')
          throw new Error('unauthorized');
      }
    return true;
      }),
    validatorMiddleware,
  ],

  checkAuthForGroup: [
    check().custom(async (val, { req }) => {
      const { id } = req.params;
      const group = await Group.findById(id);
      if (!group) throw new Error('Invalid group id');
      let user = group.members.find(member => member.userId.toString() === req.user._id.toString());
      if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
      if (req.user.role !== 'admin') {
        if (user.role !== 'admin') {
          throw new Error('unauthorized');
        }
      }
      req.role = 'admin';
    return true;
      }),
    validatorMiddleware,
  ],

  updatePostGroupValidator: [
    check('id').isMongoId().withMessage('Invalid Group Id'),
    check('postId').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, { req }) => {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      if (!post) throw new Error('Invalid post id');
      if (req.user._id.toString() !== post.userId.toString() && req.user.role !== 'admin'
              && req.role !== 'admin') {
        throw new Error('unauthorized');
      }
      return true;
    }),
    validatorMiddleware,
  ],

  deletePostGroupValidator: [
    check('id').isMongoId().withMessage('Invalid Group Id'),
    check('postId').isMongoId().withMessage('Invalid post Id')
      .custom(async (val, { req }) => {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      if (!post) throw new Error('Invalid post id');
      if (req.user._id.toString() !== post.userId.toString() && req.user.role !== 'admin'
      && req.role !== 'admin') {
        throw new Error('unauthorized');
      }
      return true;
    }),
    validatorMiddleware,
  ],
}

module.exports = groupValidator;
