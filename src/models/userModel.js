const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true, default: 'patient' },
    phone: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String, default: null },

    // Doctor-Specific Fields
    specialty: { type: String, required: function () { return this.role === 'doctor'; } },
    licenseNumber: { type: String, required: function () { return this.role === 'doctor'; } },
    availableSlots: [{ type: Date }], // Doctor's available appointment slots

    // Patient-Specific Fields
    age: { type: Number, required: function () { return this.role === 'patient'; } },
    gender: { type: String, enum: ['male', 'female', 'other'], required: function () { return this.role === 'patient'; } },
    medicalRecords: [{ type: String }], // URLs of uploaded medical files
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],


    // Staff/Admin-Specific Fields
    department: { type: String, required: function () { return this.role === 'staff' || this.role === 'admin'; } },
    
    otp: { type: String },
    otpExpires: { type: Date },
    fcmToken: { type: String },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);