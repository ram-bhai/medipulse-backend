const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'doctor', 'patient', 'staff'], 
        required: true, 
        default: 'patient' 
    },
    phone: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String, default: null },

    // ✅ Doctor-Specific Fields
    doctorProfile: {
        specialty: { type: String },
        licenseNumber: { type: String },
        availableSlots: [{ type: Date }],
    },

    // ✅ Patient-Specific Fields
    patientProfile: {
        age: { type: Number },
        gender: { type: String, enum: ['male', 'female', 'other'] },
        medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
        appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
        subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null },
    },

    // ✅ Staff/Admin-Specific Fields
    staffProfile: {
        department: { type: String },
    },

    // ✅ Common Security & Authentication Fields
    otp: { type: String },
    otpExpires: { type: Date },
    fcmToken: { type: String },
}, { timestamps: true });

// ✅ Exclude fields based on user role before returning the document
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    
    if (user.role === 'doctor') {
        delete user.patientProfile;
        delete user.staffProfile;
    }
    if (user.role === 'patient') {
        delete user.doctorProfile;
        delete user.staffProfile;
    }
    if (user.role === 'staff' || user.role === 'admin') {
        delete user.doctorProfile;
        delete user.patientProfile;
    }

    delete user.password; // Always remove password from API responses
    return user;
};

module.exports = mongoose.model('User', UserSchema);