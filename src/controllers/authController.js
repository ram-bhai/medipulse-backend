const authService = require('../services/authService');
const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require('../constants/httpstatus');

exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.CREATED).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.CREATED, user });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.login = async (req, res) => {
    try {
        const { token, user } = await authService.loginUser(req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, token, user });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await authService.getUserProfile(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, user });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        await authService.forgotPassword(req.body.email);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        await authService.resetPassword(req.body.email, req.body.otp, req.body.newPassword);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.logout = async (req, res) => {
    try {
        await authService.logoutUser(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

