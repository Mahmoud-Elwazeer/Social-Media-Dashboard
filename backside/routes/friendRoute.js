const express = require('express');
const authController = require('../controllers/authController');
const friendsController = require('../controllers/friendsController');
const friendValidator = require('../utils/validators/friendValidator');

const router = express.Router();

router.route('/send-request/:userId')
  .post(
    authController.auth_user,
    friendValidator.sendRequestValidator,
    friendsController.sendRequest,
  )

router.route('/accept-request/:friendshipId')
  .put(
    authController.auth_user,
    friendValidator.statusRequestValidator,
    friendsController.acceptRequest,
  )

router.route('/reject-request/:friendshipId')
  .put(
    authController.auth_user,
    friendValidator.statusRequestValidator,
    friendsController.rejectRequest,
  )

module.exports = router;
