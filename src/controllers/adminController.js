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
        res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ message: "All users fetched successfully", users });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.status(200).json({ message: "Dashboard stats fetched successfully", stats });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const roleSchema = z.object({
            role: z.enum(["admin", "doctor", "patient", "staff"]),
        });
        roleSchema.parse(req.body);
        
        const result = await adminService.assignRole(req.params.userId, req.body.role);
        res.status(200).json({ message: "Role assigned successfully", result });
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await adminService.getAllRoles();
        res.status(200).json({ message: "Roles fetched successfully", roles });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await adminService.deleteUser(req.params.userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.toggleUserStatus = async (req, res) => {
    try {
        const updatedUser = await adminService.toggleUserStatus(req.params.userId);
        res.status(200).json({ message: "User status updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await adminService.getAdminProfile(req.user.id);
        res.status(200).json({ message: "Admin profile fetched successfully", admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        res.status(200).json({ message: "Admin profile updated successfully", updatedAdmin });
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await adminService.getAllAppointments();
        res.status(200).json({ message: "Appointments fetched successfully", appointments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        await adminService.deleteAppointment(req.params.appointmentId);
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.rescheduleAppointment = async (req, res) => {
    try {
        rescheduleSchema.parse(req.body); // Validate request body
        const updatedAppointment = await adminService.rescheduleAppointment(req.params.appointmentId, req.body.newDate);
        
        // 📧 Notify patient & doctor via email
        await emailService.sendEmail(
            updatedAppointment.patient.email,
            "Appointment Rescheduled",
            `Your appointment with Dr. ${updatedAppointment.doctor.name} has been rescheduled to ${req.body.newDate}.`
        );

        res.status(200).json({ message: "Appointment rescheduled successfully", updatedAppointment });
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await adminService.getAllTransactions();
        res.status(200).json({ message: "Transactions fetched successfully", transactions });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTransactionDetails = async (req, res) => {
    try {
        const transaction = await adminService.getTransactionDetails(req.params.transactionId);
        res.status(200).json({ message: "Transaction details fetched successfully", transaction });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.refundPayment = async (req, res) => {
    try {
        refundSchema.parse(req.body); // Validate OTP input
        await otpService.verifyOTP(req.user.email, req.body.otp); // Verify OTP before refund
        
        const refundResponse = await adminService.refundPayment(req.params.transactionId);
        
        // 📧 Notify user about refund
        await emailService.sendEmail(
            refundResponse.user.email,
            "Refund Processed",
            `Your refund of $${refundResponse.amount} has been processed successfully.`
        );

        res.status(200).json({ message: "Payment refunded successfully", refundResponse });
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.generateReport = async (req, res) => {
    try {
        await otpService.verifyOTP(req.user.email, req.body.otp); // Secure report generation with OTP
        const report = await adminService.generateReport();
        res.status(200).json({ message: "Report generated successfully", report });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getActivityLogs = async (req, res) => {
    try {
        const logs = await adminService.getActivityLogs();
        res.status(200).json({ message: "Activity logs fetched successfully", logs });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};