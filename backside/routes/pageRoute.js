const express = require('express');
const pageControllers = require('../controllers/pageControllers');
const authController = require('../controllers/authController');
const pageValidator = require('../utils/validators/pageValidator');
const postValidator = require('../utils/validators/postValidator');

const router = express.Router();

router.route('/')
  .post(
    authController.auth_user,
    pageValidator.createPageValidator,
    pageControllers.createPage,
  )
  .get(
    authController.auth_user,
    pageControllers.getAllPages,
  )

router.route('/me')
  .get(
    authController.auth_user,
    pageControllers.getPages,
  )

router.route('/:id')
  .get(
    authController.auth_user,
    pageValidator.pageValidator,
    pageControllers.getPageById,
  )
  .put(
    authController.auth_user,
    pageValidator.updatePageValidator,
    pageControllers.updatePage,
  )
  .delete(
    authController.auth_user,
    pageValidator.updatePageValidator,
    pageControllers.deletePage,
  )

module.exports = router;
