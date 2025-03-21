const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const MedicalRecord = require("../models/medicalRecordModel");
const Transaction = require("../models/transactionModel");
const pushService = require("./pushService");

// Get Doctor Profile
exports.getProfile = async (doctorId) => {
    const doctor = await User.findById(doctorId).select("-password");
    if (!doctor || doctor.role !== "doctor") throw new Error("Doctor not found");
    return doctor;
};

// Update Doctor Profile
exports.updateProfile = async (doctorId, updateData) => {
    const doctor = await User.findByIdAndUpdate(doctorId, updateData, { new: true }).select("-password");
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
};

// Get All Appointments for Doctor
exports.getAppointments = async (doctorId) => {
    return await Appointment.find({ doctor: doctorId }).populate("patient", "name email phone");
};

// Update Appointment Status (Confirm/Cancel)
exports.updateAppointmentStatus = async ({ appointmentId, status }) => {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new Error("Appointment not found");

    appointment.status = status;
    await appointment.save();

    // Send Notification to Patient
    await pushService.sendNotification(appointment.patient, "Appointment Update", `Your appointment has been ${status}`);

    return appointment;
};

// Get Patients Assigned to Doctor
exports.getPatients = async (doctorId) => {
    return await User.find({ role: "patient", appointments: { $exists: true, $ne: [] } }).select("name email phone");
};

// Get Patient Details
exports.getPatientDetails = async (patientId) => {
    const patient = await User.findById(patientId).select("-password");
    if (!patient || patient.role !== "patient") throw new Error("Patient not found");
    return patient;
};

// Set Doctor Availability
exports.setAvailability = async (doctorId, availableSlots) => {
    const doctor = await User.findById(doctorId);
    if (!doctor) throw new Error("Doctor not found");

    doctor.availableSlots = availableSlots;
    await doctor.save();

    return doctor.availableSlots;
};

// Get Doctor Availability
exports.getAvailability = async (doctorId) => {
    const doctor = await User.findById(doctorId);
    if (!doctor) throw new Error("Doctor not found");
    return doctor.availableSlots;
};

// Get Medical Records (Uploaded by Doctor)
exports.getMedicalRecords = async (doctorId) => {
    return await MedicalRecord.find({ doctor: doctorId }).populate("patient", "name email");
};

// Upload Medical Report for a Patient
exports.uploadReport = async (doctorId, file) => {
    if (!file || !file.path) throw new Error("Invalid file upload");

    const medicalRecord = await MedicalRecord.create({
        doctor: doctorId,
        patient: file.patientId,
        fileUrl: file.path,
    });

    return medicalRecord;
};

// Get Doctor Transactions (Payments & Earnings)
exports.getTransactions = async (doctorId) => {
    return await Transaction.find({ doctor: doctorId }).sort({ createdAt: -1 });
};