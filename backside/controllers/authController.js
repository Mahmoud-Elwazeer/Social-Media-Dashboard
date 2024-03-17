require('dotenv').config()
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authUtils = require('../utils/authUtils');

const createToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
}

class authController {
  // @desc sign up
  // @route POST /api/v1/auth/signup
  // @access Public
  static signup = asyncHandler(async(req, res) => {
    const { name, slug, email, password } = req.body;
    const user = await User.create({
      name, slug, email, password
    });

    const token = createToken({ userId: user._id, role: user.role });

    res.status(201).json({ data: user, token });
  })

  // @desc sign in
  // @route POST /api/v1/auth/login
  // @access Public
  static login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          next(new ApiError('Incorrect Email or Password', 401));
          return
        }
    const token = createToken({ userId: user._id, role: user.role });
    res.status(201).json({ data: user, token });
  })

  // @desc change password for user
  // @route PUT /api/v1/auth/changePassword/:id
  // @access Private
  static changePassword = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id},
      { password: await bcrypt.hash(password, 12), passwordChangedAt: Date.now(), },
      { new: true}, // to return value after update
    )
    if (!user) {
      next(new ApiError('Not found', 404));
    }
    res.status(200).json({ data: user});
  })

  // @desc auth using for authorization for normal user
  static auth_user = asyncHandler(async(req, res, next) => {
    // catch token
    const { user } = await authUtils.checkAuth(req, next);
    req.user = user;
    next();
  })

  // @desc auth using for authorization
  static auth_admin = asyncHandler(async(req, res, next) => {
    const { user, role } = await authUtils.checkAuth(req, next);
    if (role !== 'admin') {
      next(new ApiError('You are not allowed to access this route', 401));
    }
    req.user = user;
    next();
  })
}

module.exports = authController;
