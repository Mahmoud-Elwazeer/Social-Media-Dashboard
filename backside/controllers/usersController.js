const asyncHandler = require('express-async-handler');
const userUtils = require('../utils/userUtils');

class userControllers {
  // @desc create user
  // @route POST /api/v1/users
  // @access private
  static createUserByAdmin = asyncHandler(async(req, res) => {
    const user = await userUtils.createUser(req);
    res.status(201).json({ data: user});
  })

  // @desc get list users
  // @route GET /api/v1/users
  // @access private
  static getUsersByAdmin = asyncHandler(async(req, res) => {
    const { users, page } = await userUtils.getUsers({}, req);
    res.status(200).json({ results: users.length, page, data: users});
  })

  // @desc get specific user
  // @route GET /api/v1/users/:id
  // @access private
  static getUserByIdByAdmin = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const user = await userUtils.getUserById(id, next)
    res.status(200).json({ data: user});
  })

  // @desc update specific user
  // @route PUT /api/v1/users/:id
  // @access private
  static updateUserByAdmin = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const user = await userUtils.updateUserData(id, req, next);
    res.status(200).json({ data: user});
  })

  // @desc delete specific user
  // @route DELETE /api/v1/users/:id
  // @access private
  static deleteUserByAdmin = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    await userUtils.deleteUser(id, next);
    res.status(204).send();
  })

  // @desc get specific user
  // @route GET /api/v1/users/me
  // @access public
  static getUserById = asyncHandler(async(req, res, next) => {
    const id = req.user._id;
    const user = await userUtils.getUserById(id, next)
    res.status(200).json({ data: user});
  })

  // @desc update specific user
  // @route PUT /api/v1/users/me
  // @access Public
  static updateUserData = asyncHandler(async(req, res, next) => {
    const id = req.user._id;
    const user = await userUtils.updateUserData(id, req, next);
    res.status(200).json({ data: user});
  })

  // @desc delete specific user
  // @route DELETE /api/v1/users/me
  // @access public
  static deleteUser = asyncHandler(async(req, res, next) => {
    const id = req.user._id;
    await userUtils.deleteUser(id, next);
    res.status(204).send();
  })
}

module.exports = userControllers;
