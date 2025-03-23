const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false },
    medicines: [
        {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true }, // e.g., "Twice a day"
            duration: { type: String, required: true }, // e.g., "7 days"
        },
    ],
    notes: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);