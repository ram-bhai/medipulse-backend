const { z } = require("zod");

const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    phone: z.string().min(10, "Phone number must be valid").optional(),
    age: z.number().min(1, "Age must be greater than 0").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
});

const uploadMedicalRecordSchema = z.object({
    files: z.array(z.string().url()).min(1, "At least one file URL is required"),
});

const bookAppointmentSchema = z.object({
    doctorId: z.string().length(24, "Invalid doctor ID"),
    date: z.string().datetime(),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
});

const contactSupportSchema = z.object({
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const aiSymptomCheckerSchema = z.object({
    symptoms: z.array(z.string()).min(1, "At least one symptom is required"),
});

module.exports = {
    updateProfileSchema,
    uploadMedicalRecordSchema,
    bookAppointmentSchema,
    contactSupportSchema,
    aiSymptomCheckerSchema,
};