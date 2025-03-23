const adminService = require("../services/adminService");
const { z } = require("zod");
const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require("../constants/httpstatus");

// Schema Validations Using `zod`
const createAdminSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10).max(15),
    role: z.enum(["admin", "doctor", "patient", "staff"]),
    newDate: z.string().datetime(),
    otp: z.string().length(6),
});

exports.createAdmin = async (req, res) => {
    try {
        createAdminSchema.parse(req.body);
        const admin = await adminService.createAdmin(req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.CREATED).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.CREATED, admin });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, users });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, stats });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const roleSchema = z.object({
            role: z.enum(["admin", "doctor", "patient", "staff"]),
        });
        roleSchema.parse(req.body);
        
        const result = await adminService.assignRole(req.params.userId, req.body.role);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, result });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await adminService.getAllRoles();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, roles });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updateUserSchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            phone: z.string().min(10).max(15).optional(),
            role: z.enum(["admin", "doctor", "patient", "staff"]).optional(),
        });
        updateUserSchema.parse(req.body);
        
        const updatedUser = await adminService.updateUser(req.params.userId, req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedUser });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await adminService.deleteUser(req.params.userId);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.toggleUserStatus = async (req, res) => {
    try {
        const updatedUser = await adminService.toggleUserStatus(req.params.userId);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedUser });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await adminService.getAdminProfile(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, admin });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.updateAdminProfile = async (req, res) => {
    try {
        const updateProfileSchema = z.object({
            name: z.string().min(3).optional(),
            email: z.string().email().optional(),
            phone: z.string().min(10).max(15).optional(),
        });
        updateProfileSchema.parse(req.body);

        const updatedAdmin = await adminService.updateAdminProfile(req.user.id, req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedAdmin });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await adminService.getAllAppointments();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, appointments });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        await adminService.deleteAppointment(req.params.appointmentId);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.rescheduleAppointment = async (req, res) => {
    try {
        rescheduleSchema.parse(req.body); // Validate request body
        const updatedAppointment = await adminService.rescheduleAppointment(req.params.appointmentId, req.body.newDate);
        
        // Notify patient & doctor via email
        await emailService.sendEmail(
            updatedAppointment.patient.email,
            "Appointment Rescheduled",
            `Your appointment with Dr. ${updatedAppointment.doctor.name} has been rescheduled to ${req.body.newDate}.`
        );
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedAppointment });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await adminService.getAllTransactions();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, transactions });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getTransactionDetails = async (req, res) => {
    try {
        const transaction = await adminService.getTransactionDetails(req.params.transactionId);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, transaction });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.refundPayment = async (req, res) => {
    try {
        refundSchema.parse(req.body); // Validate OTP input
        await otpService.verifyOTP(req.user.email, req.body.otp); // Verify OTP before refund
        
        const refundResponse = await adminService.refundPayment(req.params.transactionId);
        
        // Notify user about refund
        await emailService.sendEmail(
            refundResponse.user.email,
            "Refund Processed",
            `Your refund of $${refundResponse.amount} has been processed successfully.`
        );
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, refundResponse });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.generateReport = async (req, res) => {
    try {
        await otpService.verifyOTP(req.user.email, req.body.otp); // Secure report generation with OTP
        const report = await adminService.generateReport();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, report });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getActivityLogs = async (req, res) => {
    try {
        const logs = await adminService.getActivityLogs();
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, logs });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({  message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};