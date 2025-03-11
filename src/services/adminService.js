const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const emailService = require("./emailService");
const appointment = require("../models/appointmentModel");
const transaction = require("../models/transactionModel");

exports.createAdmin = async (adminData) => {
    const { name, email, password, phone } = adminData;

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) throw new Error("Admin already exists");

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
        phone,
    });

    // Send welcome email
    await emailService.sendEmail(
        newAdmin.email,
        "Admin Account Created",
        `Hello ${newAdmin.name}, you have been registered as an Admin. Please login with your credentials.`
    );

    return newAdmin;
};

exports.getAllUsers = async () => {
    return await User.find().select("-password");
};

exports.getDashboardStats = async () => {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalPatients = await User.countDocuments({ role: "patient" });

    return {
        totalUsers,
        totalAdmins,
        totalDoctors,
        totalPatients,
    };
};

exports.assignRole = async (userId, role) => {
    const validRoles = ["admin", "doctor", "patient", "staff"];
    if (!validRoles.includes(role)) throw new Error("Invalid role provided");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.role = role;
    await user.save();

    return user;
};

exports.getAllRoles = async () => {
    return ["admin", "doctor", "patient", "staff"];
};

exports.updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
};

exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

exports.toggleUserStatus = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.isActive = !user.isActive;
    await user.save();

    return user;
};

exports.getAdminProfile = async (adminId) => {
    return await User.findById(adminId).select("-password");
};

exports.updateAdminProfile = async (adminId, updateData) => {
    return await User.findByIdAndUpdate(adminId, updateData, { new: true }).select("-password");
};

exports.getAllAppointments = async () => {
    return await Appointment.find().populate("patient doctor", "name email");
};

exports.deleteAppointment = async (appointmentId) => {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) throw new Error("Appointment not found");
};

exports.rescheduleAppointment = async (appointmentId, newDate) => {
    const appointment = await Appointment.findById(appointmentId).populate("patient doctor");
    if (!appointment) throw new Error("Appointment not found");

    appointment.date = newDate;
    await appointment.save();
    
    return appointment;
};

exports.getAllTransactions = async () => {
    return await Transaction.find().sort({ createdAt: -1 });
};

exports.getTransactionDetails = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
};

exports.refundPayment = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId).populate("user");
    if (!transaction) throw new Error("Transaction not found");

    if (transaction.status !== "completed") {
        throw new Error("Only completed transactions can be refunded");
    }

    transaction.status = "refunded";
    await transaction.save();

    return transaction;
};

exports.generateReport = async () => {
    const totalAppointments = await Appointment.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalRevenue = await Transaction.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);

    return {
        totalAppointments,
        totalTransactions,
        totalRevenue: totalRevenue[0]?.total || 0,
    };
};

exports.getActivityLogs = async () => {
    return await ActivityLog.find().sort({ createdAt: -1 });
};