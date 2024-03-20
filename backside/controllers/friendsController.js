const Friend = require('../models/friendModel');
const docUtils = require('../utils/docUtils');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const friendUtils = require('../utils/freindUtils');
const freindUtils = require('../utils/freindUtils');
const User = require('../models/userModel');

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
    const query = {
      "status": "accepted"
    }
    const friend = await freindUtils.updateStatus(query, req, next);
    if (!friend) return;
    const query1 = { $push: { 'friends': friend.user2 } };
    const user1 = await docUtils.updateDoc(User, friend.user1, query1, next);
    if (!user1) return;
    const query2 = { $push: { 'friends': friend.user1 } };
    const user2 = await docUtils.updateDoc(User, friend.user2, query2, next);
    if (!user2) return;
    res.status(200).json({ data: friend });
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
    res.status(200).json({ data: friend });
  })

  // @desc cancel request
  // @route DELETE /api/v1/friendships/cancel-request/:friendshipId
  // @access public
  static cancelRequest = asyncHandler(async(req, res, next) => {
    const friend = await friendUtils.deletefriend(req, next);
    if (!friend) return;
    res.status(204).send();
  });

  // @desc unfriend
  // @route DELETE /api/v1/friendships/unfriend/:friendshipId
  // @access public
  static unfriend = asyncHandler(async(req, res, next) => {
    const friend = await freindUtils.getFriend(req, next);
    if (!friend) return;
    const query1 = { $pull: { 'friends': friend.user2 } };
    const user1 = await docUtils.updateDoc(User, friend.user1, query1, next);
    if (!user1) return;
    const query2 = { $pull: { 'friends': friend.user1 } };
    const user2 = await docUtils.updateDoc(User, friend.user2, query2, next);
    if (!user2) return;
    const friendship = await friendUtils.deletefriend(req, next);
    if (!friendship) return;
    res.status(204).send();
  });
}

module.exports = friendsController;
