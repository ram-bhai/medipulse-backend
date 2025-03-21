const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES} = require('../constants/httpstatus');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json({ message: 'Access Denied. No token provided.' });

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object

        if (!req.user) return res.status(HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json({ message: 'Invalid token. User not found.' });

        next();
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json({ message: 'Unauthorized. Invalid or expired token.' });
    }
};

// Role-Based Authorization Middleware
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(HTTP_STATUS_CODES.CLIENT_ERROR.FORBIDDEN).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.FORBIDDEN });
        }
        next();
    };
};
