const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpService = require('./otpService');
const emailService = require('./emailService');

exports.registerUser = async (userData) => {
    const { name, email, password, role, age, phone, gender, fcmToken } = userData;
    if (role === 'admin') throw new Error('Cannot register as an admin');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role, age, phone, gender, fcmToken });

    // Send welcome email after successful registration
    await emailService.sendEmail(
        user.email,
        'Welcome to MediPulse!',
        `Hello ${user.name}, your account has been successfully created.`,
        'Visit Dashboard',
        `${process.env.FRONTEND_URL}/dashboard`
    );

    return user;
};

exports.loginUser = async ({ email, password, fcmToken }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email address');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password, Please enter a valid password');
    
    // Update FCM token in DB on login
    if (fcmToken) {
        user.fcmToken = fcmToken;
        await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { token, user };
};

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    // Generate OTP using otpService
    const otp = await otpService.generateOTP(email);

    // Send OTP email using the template
    await emailService.sendEmail(
        email,
        'Password Reset OTP',
        `Use the OTP below to reset your password. <br> <b>OTP:</b> ${otp}`,
        'Reset Password',
        `${process.env.FRONTEND_URL}/reset-password`
    );
};

exports.resetPassword = async (email, otp, newPassword) => {
    // Verify OTP using otpService
    await otpService.verifyOTP(email, otp);

    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Send password reset confirmation email
    await emailService.sendEmail(
        email,
        'Password Reset Successful',
        'Your password has been reset successfully. If this was not you, please contact support immediately.',
        'Help & Support',
        `${process.env.FRONTEND_URL}/support`
    );
};

exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    if (!user) throw new Error('User not found');
    return user;
};

exports.logoutUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.fcmToken = null; // Clear the FCM token on logout
    await user.save();
};
