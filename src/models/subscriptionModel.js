const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["monthly", "yearly"], required: true },
    amount: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired", "canceled"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);