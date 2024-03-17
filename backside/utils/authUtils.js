require('dotenv').config()
const asyncHandler = require('express-async-handler');
const ApiError = require('./apiError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class authUtils {
  // @desc using to check authetication
  static checkAuth = asyncHandler(async(req, next) => {
    let obj = { user: null, userId: null, role: null, decode: null, token: null };
    // catch token
    let token = req.headers.authorization
    if (!token || !token.startsWith('Bearer')) {
      next(new ApiError('Authorization is required', 401));
    }
    token = token.split(' ')[1];
    // verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check user if exist
    const user = await User.findById(decode.userId);
    if (!user) {
      next(new ApiError('The user that belong to this token does no longer exist', 401));
    }

    if (user.passwordChangedAt) {
      const passwordChangedGetstamp = parseInt(
        user.passwordChangedAt.getTime() / 1000,
        10
      );
      if (passwordChangedGetstamp > decode.iat) {
        next(new ApiError('User recently changed his password. please login again..', 401));
      }
    }

    obj = {
      user,
      userId: decode.userId,
      role: decode.role,
      decode,
      token,
    }

    return obj;
  })
}

module.exports = authUtils;
