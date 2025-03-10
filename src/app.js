const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const {HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES} = require('./constants/httpstatus');

dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.headers['content-type']?.startsWith('multipart/form-data')) {
    next(); // Skip JSON parsing for file uploads
  } else {
    express.json()(req, res, next);
  }
});

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorMiddleware.errorHandler);

// Catch-all error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(HTTP_STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ message: HTTP_STATUS_MESSAGES.SERVER_ERROR.INTERNAL_SERVER_ERROR });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
