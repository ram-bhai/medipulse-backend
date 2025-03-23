const User = require('../models/userModel');
const crypto = require('crypto');

exports.generateOTP = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpies = Date.now() + 10 * 60 * 1000; // 10 min expiry
    await user.save();

    return otp;
};

exports.verifyOTP = async (email, otp) => {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
        throw new Error('Invalid or expired OTP');
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
};
