const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["email", "push"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);