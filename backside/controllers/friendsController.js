const Friend = require('../models/friendModel');
const docUtils = require('../utils/docUtils');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const friendUtils = require('../utils/freindUtils');
const freindUtils = require('../utils/freindUtils');

class friendsController {
  // @desc send request
  // @route POST /api/v1/friendships/send-request/:userId
  // @access public
  static sendRequest = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const query = {
      user1: req.user._id,
      user2: userId,
    }
    const friend = await docUtils.createDoc(Friend, query);
    res.status(201).json({ data: friend });
  })

  // @desc accept request
  // @route PUT /api/v1/friendships/accept-request/:friendshipId
  // @access public
  static acceptRequest = asyncHandler(async(req, res, next) => {
    const { friendshipId } = req.params;
    const friendship = await docUtils.getlDocById(Friend, friendshipId, next);
    if (!friendship) return;
    if ((friendship.user1 !== req.user._id || friendship.user1 !== req.user._id) && req.user.role !== 'admin') {
      next(new ApiError('You are not allowed to access this route', 401));
      return;
    }
    const query = {
      "status": "accepted"
    }
    const friend = await docUtils.updateDoc(Friend, friendshipId, query, next);
    if (!friend) return;
    res.status(201).json({ data: friend });
  })

  // @desc accept request
  // @route PUT /api/v1/friendships/accept-request/:friendshipId
  // @access public
  static acceptRequest = asyncHandler(async(req, res, next) => {
    const query = {
      "status": "accepted"
    }
    const friend = await freindUtils.updateStatus(query, req, next);
    if (!friend) return;
    res.status(201).json({ data: friend });
  })

  // @desc reject request
  // @route PUT /api/v1/friendships/reject-request/:friendshipId
  // @access public
  static rejectRequest = asyncHandler(async(req, res, next) => {
    const query = {
      "status": "rejected"
    }
    const friend = await freindUtils.updateStatus(query, req, next);
    if (!friend) return;
    res.status(201).json({ data: friend });
  })
}

module.exports = friendsController;
