const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const postValidator = require('../utils/validators/postValidator');

const router = express.Router();

router.route('/createpost')
  .post(
    authController.auth_user,
    postValidator.createPostValidator,
    postsController.creatPost,
)

module.exports = router;
