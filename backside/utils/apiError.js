// @desc: this class is responsible about operations errors (that I can predict)
class ApiError extends Error{
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperational = true; // to prdict this error
  }
}

module.exports = ApiError;
