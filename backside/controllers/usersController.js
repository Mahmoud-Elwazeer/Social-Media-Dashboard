const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');

class userControllers {
  // @desc create user
  // @route POST /api/v1/users
  static createUser = asyncHandler(async(req, res) => {
    const { name, slug, email, password } = req.body;
    const { role='user', profileImage='', bio='', location='', dateOfBirth='' } = req.body;

    const user = await User.create({
      name, slug, email, password,
      role, profileImage, bio, location, dateOfBirth
    });
    res.status(201).json({ data: user});
  })

  // @desc get list users
  // @route GET /api/v1/users
  static getUsers = asyncHandler(async(req, res) => {
    // pagination for page
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;  // when got to page 2 => skip (2 - 1) * limit
    const users = await User.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: users.length, page, data: users});
  })

  // @desc get specific user
  // @route GET /api/v1/users/:id
  static getUserById = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    res.status(200).json({ data: user});
  })

  // @desc update specific user
  // @route PUT /api/v1/users/:id
  static updateUserData = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { name, slug, email, role, profileImage, bio, location, dateOfBirth } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id},
      { name, slug, email, role, bio, location, dateOfBirth},
      { new: true}, // to return value after update
    )
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    res.status(200).json({ data: user});
  })

  // @desc delete specific user
  // @route DELETE /api/v1/users/:id
  static deleteUser = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    res.status(204).send();
  })


  // @desc change password for user
  // @route PUT /api/v1/users/changePassword/:id
  static changePassword = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id},
      { password: await bcrypt.hash(password, 12) },
      { new: true}, // to return value after update
    )
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    res.status(200).json({ data: user});
  })

}

module.exports = userControllers;
