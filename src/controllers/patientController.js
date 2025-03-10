const patientService = require('../services/patientService');
const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require('../constants/httpstatus');

exports.getProfile = async (req, res) => {
    try {
        const patient = await patientService.getPatientProfile(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, patient });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updatedPatient = await patientService.updatePatientProfile(req.user.id, req.body, req.file ? req.file.path : null);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, updatedPatient });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.uploadMedicalRecord = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: 'No files uploaded' });
        }
        
        const fileUrls = req.files.map(file => file.path);
        const record = await patientService.uploadMedicalRecord(req.user.id, fileUrls);
        res.status(HTTP_STATUS_CODES.SUCCESS.CREATED).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.CREATED, record });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.bookAppointment = async (req, res) => {
    try {
        const appointment = await patientService.bookAppointment(req.user.id, req.body);
        res.status(HTTP_STATUS_CODES.SUCCESS.CREATED).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.CREATED, appointment });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const response = await patientService.deletePatientAccount(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({message: HTTP_STATUS_MESSAGES.SUCCESS.OK, response});
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.contactSupport = async (req, res) => {
    try {
        await patientService.contactSupport(req.user.id, req.body.message);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.subscribePremium = async (req, res) => {
    try {
        const subscription = await patientService.subscribePremium(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, subscription });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.viewSubscription = async (req, res) => {
    try {
        const subscription = await patientService.viewSubscription(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({message: HTTP_STATUS_MESSAGES.SUCCESS.OK, subscription });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.cancelSubscription = async (req, res) => {
    try {
        const response = await patientService.cancelSubscription(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({message: HTTP_STATUS_MESSAGES.SUCCESS.OK, response});
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.getMedicalRecords = async (req, res) => {
    try {
        const records = await patientService.getMedicalRecords(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, records });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.deleteMedicalRecord = async (req, res) => {
    try {
        await patientService.deleteMedicalRecord(req.user.id, req.params.recordId);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.aiSymptomChecker = async (req, res) => {
    try {
        const analysis = await patientService.aiSymptomChecker(req.body.symptoms);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, analysis });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.healthRiskAssessment = async (req, res) => {
    try {
        const assessment = await patientService.healthRiskAssessment(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, assessment });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await patientService.deletePatientAccount(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await patientService.getAppointments(req.user.id);
        res.status(HTTP_STATUS_CODES.SUCCESS.OK).json({ message: HTTP_STATUS_MESSAGES.SUCCESS.OK, appointments });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json({ message: HTTP_STATUS_MESSAGES.CLIENT_ERROR.BAD_REQUEST, error });
    }
};
