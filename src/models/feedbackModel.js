const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);