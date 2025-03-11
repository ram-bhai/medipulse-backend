const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "completed", "cancelled"], 
        default: "pending"
    },
    reason: { type: String, required: true },
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription", default: null },
    notes: { type: String, default: null },
    createdBy: { type: String, enum: ["patient", "admin"], required: true }, // Who booked the appointment
    paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);