const authService = require('../services/authService');
const { z } = require('zod');
const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require('../constants/httpstatus');

const authSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10).max(15).optional(),
    role: z.enum(["admin", "doctor", "patient", "staff"]).optional(),
    phone: z.string().min(10).max(12).optional(),
    age: z.number().min(1).max(100).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    otp: z.string().length(6).optional(),
    newPassword: z.string().min(6).optional(),
});

exports.register = async (req, res) => {
    try {
        authSchema.pick({ name: true, email: true, password: true, phone: true, role: true }).parse(req.body);
        const user = await authService.registerUser(req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.CREATED).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.CREATED, data: user });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        authSchema.pick({ email: true, password: true }).parse(req.body);
        const { token, user } = await authService.loginUser(req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, token, data: user });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await authService.getUserProfile(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, data: user });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        authSchema.pick({ email: true }).parse(req.body);
        await authService.forgotPassword(req.body.email);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        authSchema.pick({ email: true, otp: true, newPassword: true }).parse(req.body);
        await authService.resetPassword(req.body.email, req.body.otp, req.body.newPassword);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        await authService.logoutUser(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

