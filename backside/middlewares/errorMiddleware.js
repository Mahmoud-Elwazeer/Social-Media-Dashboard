// Global error Handling middleware
require('dotenv').config();

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    if (err.name === 'JsonWebTokenError') return sendJwtError(err, res);
    if (err.name === 'TokenExpiredError') return sendExpireTokenError(err, res);
    sendError(err, res);
  }
}

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

const sendJwtError = (err, res) => {
  res.status(401).json({
    status: err.status,
    message: 'Invalid token, please login again..',
  });
}

const sendExpireTokenError = (err, res) => {
  res.status(401).json({
    status: err.status,
    message: 'Expired token, please login again..',
  });
}

module.exports = globalError;
