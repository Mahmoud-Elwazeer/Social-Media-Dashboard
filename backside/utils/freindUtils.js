const docUtils = require('./docUtils');
const asyncHandler = require('express-async-handler');
const ApiError = require('./apiError');
const Friend = require('../models/friendModel');

class freindUtils {
  static updateStatus = asyncHandler(async(query, req, next) => {
    const { friendshipId } = req.params;
    const friendship = await docUtils.getlDocById(Friend, friendshipId, next);
    if (!friendship) return;
    if (friendship.status !== "pending") {
      next(new ApiError('Not Found', 404));
      return;
    }
    if ((friendship.user1.toString() !== req.user._id.toString() && req.user.role !== 'admin') &&
      (friendship.user2.toString() !== req.user._id.toString() && req.user.role !== 'admin')) { 
      next(new ApiError('You are not allowed to access this route', 401));
      return;
    }
    const friend = await docUtils.updateDoc(Friend, friendshipId, query, next);
    if (!friend) return;
    return friend;
  })
}

module.exports = freindUtils;
