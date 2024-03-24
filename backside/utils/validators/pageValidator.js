const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');
const Page = require('../../models/pageModel');

const pageValidator = {
  createPageValidator: [
    check('name').notEmpty().withMessage('Invalid Name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  ],
  pageValidator: [
    check('id').isMongoId().withMessage('Invalid Page Id'),
    validatorMiddleware,
  ],
  updatePageValidator: [
    check('name')
    .custom((val, { req }) => {
      if (!val) return true;
      req.body.slug = slugify(val);
      return true;
    }),
    check('id').isMongoId().withMessage('Invalid Page Id')
      .custom(async (val, { req }) => {
        const { id } = req.params;
        const page = await Page.findById(id);
        if (!page) throw new Error('Invalid page id');
        const user = page.admins.find(admin => admin.toString() === req.user._id.toString());
        if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
      return true;
    }),
    validatorMiddleware,
  ],
  addAdminToPageValidator: [
    check('adminId').isMongoId().withMessage('Invalid user Id'),
    check('id').isMongoId().withMessage('Invalid Page Id')
      .custom(async (val, { req }) => {
      const { id, adminId } = req.params;
      const page = await Page.findById(id);
      if (!page) throw new Error('Invalid page id');
      let user = page.admins.find(admin => admin.toString() === adminId.toString());
      if (user) throw new Error('You have already in page')
      user = page.admins.find(admin => admin.toString() === req.user._id.toString());
      if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
    return true;
      }),
    validatorMiddleware,
  ],

  deleteAdminFromPageValidator: [
    check('adminId').isMongoId().withMessage('Invalid user Id'),
    check('id').isMongoId().withMessage('Invalid Page Id')
      .custom(async (val, { req }) => {
      const { id, adminId } = req.params;
      const page = await Page.findById(id);
      if (!page) throw new Error('Invalid page id');
      let user = page.admins.find(admin => admin.toString() === adminId.toString());
      if (!user) throw new Error('You aren\'t in this page')
      user = page.admins.find(admin => admin.toString() === req.user._id.toString());
      if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
    return true;
      }),
    validatorMiddleware,
  ],

  checkAuthForPage: [
    check().custom(async (val, { req }) => {
      const { id } = req.params;
      const page = await Page.findById(id);
      if (!page) throw new Error('Invalid page id');
      let user = page.admins.find(admin => admin.toString() === req.user._id.toString());
      if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
      req.role = 'admin';
    return true;
      }),
    validatorMiddleware,
  ],

  deleteFollowerFromPageValidator: [
    check('followerId').isMongoId().withMessage('Invalid user Id'),
    check('id').isMongoId().withMessage('Invalid Page Id')
      .custom(async (val, { req }) => {
        if (req.user.role === 'admin') return true;
        const { id, followerId } = req.params;
        const page = await Page.findById(id);
        if (!page) throw new Error('Invalid page id');
        let user = page.followers.find(follower => follower.toString() === followerId.toString());
        if (!user) throw new Error('You aren\'t in this page')
        if (req.user._id.toString() == followerId.toString()) return true;
        let admin = page.admins.find(admin => admin.toString() === req.user._id.toString());
        if (admin) return true
        throw new Error('unauthorized');
      }),
    validatorMiddleware,
  ],
}

module.exports = pageValidator;
