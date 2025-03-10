// patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const uploadMiddleware = require('../middlewares/uploadMediaMiddleware');

router.post('/book-appointment', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.bookAppointment);
router.get('/profile', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.getProfile);
router.put('/update', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), uploadMiddleware.uploadSingle, patientController.updateProfile);
router.delete('/delete-account', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.deleteAccount);
router.get('/appointments', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.getAppointments);
router.post('/upload-medical-record', authMiddleware.authenticate, uploadMiddleware.uploadMultiple, patientController.uploadMedicalRecord);
router.get('/medical-records', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.getMedicalRecords);
router.delete('/delete-medical-record/:recordId', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.deleteMedicalRecord);
router.post('/ai-symptom-checker', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.aiSymptomChecker);
router.get('/health-risk-assessment', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.healthRiskAssessment);
router.post('/contact-support', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.contactSupport);
router.post('/subscribe-premium', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.subscribePremium);
router.get('/subscription', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.viewSubscription);
router.post('/cancel-subscription', authMiddleware.authenticate, roleMiddleware.allowOnly(['patient']), patientController.cancelSubscription);

module.exports = router;
