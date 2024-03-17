require('dotenv').config()
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (payload) => {
  return jwt.sign(
    { userId: payload },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
}

class authController {
  // @desc sign up
  // @route POST /api/v1/auth/signup
  static signup = asyncHandler(async(req, res) => {
    const { name, slug, email, password } = req.body;
    const user = await User.create({
      name, slug, email, password
    });

    const token = createToken(user._id);

    res.status(201).json({ data: user, token });
  })

  // @desc sign in
  // @route POST /api/v1/auth/signin
  static signin = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          next(new ApiError('Incorrect Email or Password', 401));
          return
        }
    const token = createToken(user._id);
    res.status(201).json({ data: user, token });
  })
}

module.exports = authController;
