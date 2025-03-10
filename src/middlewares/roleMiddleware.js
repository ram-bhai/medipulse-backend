const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require('../constants/httpstatus');
exports.allowOnly = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(HTTP_STATUS_CODES.CLIENT_ERROR.FORBIDDEN).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.FORBIDDEN });
        }
        next();
    };
};
