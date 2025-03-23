const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Doctor Profile Management
router.get("/profile", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getProfile);
router.put("/update-profile", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.updateProfile);

// Appointment Management
router.get("/appointments", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getAppointments);
router.post("/update-appointment-status", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.updateAppointmentStatus);

// Patient Interaction
router.get("/patients", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getPatients);
router.get("/patient/:patientId", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getPatientDetails);

// Scheduling & Availability
router.post("/set-availability", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.setAvailability);
router.get("/availability", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getAvailability);

// Medical Records & Reports
router.get("/medical-records", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getMedicalRecords);
router.post("/upload-report", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.uploadReport);

// Billing & Payments
router.get("/transactions", authMiddleware.authenticate, roleMiddleware.allowOnly(["doctor"]), doctorController.getTransactions);


module.exports = router;