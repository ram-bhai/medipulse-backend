const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Optional, if uploaded by doctor
    fileUrl: { type: String, required: true }, // Cloud storage link
    recordType: { 
        type: String, 
        enum: ["prescription", "x-ray", "lab-report", "scan", "other"], 
        required: true 
    },
    description: { type: String, default: null },
    uploadedBy: { type: String, enum: ["doctor", "patient"], required: true }, // Who uploaded it
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false }, // Optional, linked to an appointment
}, { timestamps: true });

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);