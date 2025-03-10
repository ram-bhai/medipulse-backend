// src/routes/authRoutes.js - Authentication Routes
const express = require('express');
const router = express.Router();    
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware.authenticate, authController.getProfile);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/logout', authMiddleware.authenticate, authController.logout);

module.exports = router;