const doctorService = require("../services/doctorService");
const { z } = require("zod");
const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require("../constants/httpstatus");

// Schema Validations Using `zod`
const updateProfileSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    specialty: z.string().min(3).optional(),
    licenseNumber: z.string().min(5).optional(),
});

exports.getProfile = async (req, res) => {
    try {
        const doctor = await doctorService.getProfile(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, doctor });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        updateProfileSchema.parse(req.body); // Validate request
        const updatedDoctor = await doctorService.updateProfile(req.user.id, req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedDoctor });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await doctorService.getAppointments(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, appointments });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const appointmentSchema = z.object({
            appointmentId: z.string().min(1),
            status: z.enum(["confirmed", "cancelled"]),
        });
        appointmentSchema.parse(req.body);

        const updatedAppointment = await doctorService.updateAppointmentStatus(req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedAppointment });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await doctorService.getPatients(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, patients });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getPatientDetails = async (req, res) => {
    try {
        const patient = await doctorService.getPatientDetails(req.params.patientId);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, patient });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.setAvailability = async (req, res) => {
    try {
        const availabilitySchema = z.object({
            availableSlots: z.array(z.string().datetime()),
        });
        availabilitySchema.parse(req.body);

        const availability = await doctorService.setAvailability(req.user.id, req.body.availableSlots);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, availability });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getAvailability = async (req, res) => {
    try {
        const availability = await doctorService.getAvailability(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, availability });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getMedicalRecords = async (req, res) => {
    try {
        const medicalRecords = await doctorService.getMedicalRecords(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, medicalRecords });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.uploadReport = async (req, res) => {
    try {
        if (!req.file) throw new Error("File is required");

        const report = await doctorService.uploadReport(req.user.id, req.file);
        res.status(201).json({ message: "Medical report uploaded successfully", report });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await doctorService.getTransactions(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, transactions });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error: error.message });
    }
};