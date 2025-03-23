const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


// Admin Management
router.post("/create-admin", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.createAdmin);
router.get("/all-users", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getAllUsers);
router.get("/dashboard-stats", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getDashboardStats);

// Role & Permission Management
router.post("/assign-role/:userId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.assignRole);
router.get("/roles", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getAllRoles);
// router.get("/permissions", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getAllPermissions);

// User Account Management
router.put("/update-user/:userId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.updateUser);
router.delete("/delete-user/:userId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.deleteUser);
router.put("/toggle-user-status/:userId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.toggleUserStatus);

// Appointment & Scheduling
router.get("/appointments", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getAllAppointments);
router.delete("/delete-appointment/:appointmentId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.deleteAppointment);
router.post("/reschedule-appointment/:appointmentId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.rescheduleAppointment);

// Financial & Payment Management
router.get("/transactions", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getAllTransactions);
router.get("/transaction/:transactionId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getTransactionDetails);
router.post("/refund-payment/:transactionId", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.refundPayment);

// Reports & Analytics
router.get("/generate-report", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.generateReport);
router.get("/activity-logs", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getActivityLogs);

// Admin Profile
router.get("/profile", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.getAdminProfile);
router.put("/update-profile", authMiddleware.authenticate, roleMiddleware.allowOnly(["admin"]), adminController.updateAdminProfile);

module.exports = router;
    