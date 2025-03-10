// src/services/patientService.js
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const emailService = require("./emailService");

exports.getPatientProfile = async (userId) => {
  const patient = await User.findById(userId).select(
    "-password -otp -otpExpires"
  );
  if (!patient) throw new Error("Patient not found");
  return patient;
};

exports.updatePatientProfile = async (userId, updateData, profileImage) => {
  const updateFields = { ...updateData };

  if (profileImage) {
    updateFields.profilePicture = profileImage;
  }

  const patient = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
  }).select("-password");
  if (!patient) throw new Error("Patient not found");
  return patient;
};

exports.uploadMedicalRecord = async (userId, fileUrls) => {
  const patient = await User.findById(userId);
  if (!patient) throw new Error("Patient not found");
  if (!Array.isArray(fileUrls))
    throw new Error("Expected an array of file URLs");
  if (!patient.medicalRecords) patient.medicalRecords = [];
  patient.medicalRecords.push(...fileUrls);
  await patient.save();
  return patient.medicalRecords;
};

exports.bookAppointment = async (userId, appointmentData) => {
  const appointment = await Appointment.create({
    ...appointmentData,
    patient: userId,
  });
  return appointment;
};

exports.deletePatientAccount = async (userId) => {
  const patient = await User.findByIdAndDelete(userId);
  if (!patient) throw new Error("Patient not found");
  return { message: "Patient account deleted successfully" };
};

exports.contactSupport = async (userId, message) => {
  const patient = await User.findById(userId);
  if (!patient) throw new Error("Patient not found");
  await emailService.sendEmail(
    process.env.SUPPORT_EMAIL,
    "Patient Support Request",
    `Patient ${patient.name} (${patient.email}) sent a support request: ${message}`
  );
};

exports.subscribePremium = async (userId) => {
  const patient = await User.findById(userId);
  if (!patient) throw new Error("Patient not found");
  patient.isPremium = true;
  patient.subscriptionExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  await patient.save();
  return patient;
};

exports.viewSubscription = async (userId) => {
  const patient = await User.findById(userId).select(
    "isPremium subscriptionExpires"
  );
  if (!patient) throw new Error("Patient not found");
  return patient;
};

exports.cancelSubscription = async (userId) => {
  const patient = await User.findById(userId);
  if (!patient) throw new Error("Patient not found");
  patient.isPremium = false;
  patient.subscriptionExpires = null;
  await patient.save();
  return { message: "Subscription canceled successfully" };
};

exports.getMedicalRecords = async (userId) => {
  const patient = await User.findById(userId);
  if (!patient) throw new Error("Patient not found");
  return patient.medicalRecords;
};

exports.deleteMedicalRecord = async (userId, recordId) => {
  const patient = await User.findById(userId);
  if (!patient) throw new Error("Patient not found");
  patient.medicalRecords = patient.medicalRecords.filter(
    (record) => record.toString() !== recordId
  );
  await patient.save();
};

exports.aiSymptomChecker = async (symptoms) => {
  // Mock AI logic for symptom checking
  return {
    diagnosis: "Possible Flu",
    recommendation:
      "Drink fluids, rest, and consult a doctor if symptoms persist.",
  };
};

exports.healthRiskAssessment = async (userId) => {
  // Mock health risk assessment logic
  return {
    riskLevel: "Low",
    recommendation: "Maintain a healthy diet and regular exercise.",
  };
};

exports.deletePatientAccount = async (userId) => {
  const patient = await User.findByIdAndDelete(userId);
  if (!patient) throw new Error("Patient not found");
};

exports.getAppointments = async (userId) => {
  return await Appointment.find({ patient: userId });
};
