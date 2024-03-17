require('dotenv').config()
const asyncHandler = require('express-async-handler');
const ApiError = require('./apiError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class userUtils {
  // @desc create new user
    static createUser = asyncHandler(async(req) => {
    const { name, slug, email, password } = req.body;
    const { role='user', profileImage='', bio='', location='', dateOfBirth='' } = req.body;

    const user = await User.create({
      name, slug, email, password,
      role, profileImage, bio, location, dateOfBirth
    });

    return (user);
  });

  // @desc get all users depend on query
  static getUsers = asyncHandler(async(query, req) => {
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;  // when got to page 2 => skip (2 - 1) * limit
    const users = await User.find(query).skip(skip).limit(limit);

    return (users);
  });

  // @desc get user depend on ID
  static getUserById = asyncHandler(async(id, next) => {
    const user = await User.findById(id);
    if (!user) {
      next(new ApiError('Not found', 404));
    }

    return (user);
  });

  // @desc update date of user depend on ID
  static updateUserData = asyncHandler(async(id, req, next) => {
    const { name, slug, email, role, profileImage, bio, location, dateOfBirth } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id},
      { name, slug, email, role, bio, location, dateOfBirth},
      { new: true}, // to return value after update
    )
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    return (user);
  });

  // @desc delete user depend on ID
  static deleteUser = asyncHandler(async(id, req, next) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    return true;
  });

}

module.exports = userUtils;
