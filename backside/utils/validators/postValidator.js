const { body, check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Post = require('../../models/postModel');

const postValidator = {
  createPostValidator: [
    body().custom((val, { req }) => {
      if (!req.body.content && !req.body.images) {
        throw new Error('Post must have a content');
      }
      return true;
    }),
    validatorMiddleware,
  ],
}

module.exports = postValidator;
