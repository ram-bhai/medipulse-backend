const { HTTP_STATUS_CODES } = require('../constants/httpstatus');

exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  let statusCode = res.statusCode === HTTP_STATUS_CODES.SUCCESS.OK ? HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR : res.statusCode;
  res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
