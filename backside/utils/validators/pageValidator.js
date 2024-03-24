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
    check('id').isMongoId().withMessage('Invalid Group Id'),
    validatorMiddleware,
  ],
  updatePageValidator: [
    check('name')
    .custom((val, { req }) => {
      if (!val) return true;
      req.body.slug = slugify(val);
      return true;
    }),
    check('id').isMongoId().withMessage('Invalid Group Id')
      .custom(async (val, { req }) => {
        const { id } = req.params;
        const page = await Page.findById(id);
        if (!page) throw new Error('Invalid group id');
        const user = page.admins.find(admin => admin.toString() === req.user._id.toString());
        if (!user && req.user.role !== 'admin') throw new Error('unauthorized');
      return true;
    }),
    validatorMiddleware,
  ],
}

module.exports = pageValidator;
