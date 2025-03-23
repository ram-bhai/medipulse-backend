const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Can be a patient or doctor
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false }, // Optional, for appointment payments
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: { 
        type: String, 
        enum: ["pending", "completed", "failed", "refunded"], 
        default: "pending"
    },
    transactionType: { 
        type: String, 
        enum: ["appointment", "subscription", "refund", "other"], 
        required: true 
    },
    paymentMethod: { type: String, required: true }, // e.g., "Credit Card", "PayPal", "UPI"
    referenceId: { type: String, required: true, unique: true }, // Unique transaction reference
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);