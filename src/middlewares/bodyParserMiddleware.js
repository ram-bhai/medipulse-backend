const express = require('express');

module.exports = (req, res, next) => {
    if (req.headers['content-type']?.startsWith('multipart/form-data')) {
        next(); // Skip JSON parsing for file uploads
    } else {
        express.json()(req, res, next);
    }
};
