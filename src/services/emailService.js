// const { Resend } = require('resend');
const nodemailer = require("nodemailer"); 
const fs = require('fs');
const path = require('path');

// const resend = new Resend(process.env.RESEND_API_KEY);

// Load email template dynamically
const loadEmailTemplate = () => {
    try {
        const templatePath = path.join(__dirname, '../templates/emailTemplate.html');
        return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
        console.error('Error loading email template:', error);
        throw new Error('Failed to load email template');
    }
};

// Function to replace placeholders dynamically
const fillTemplate = (template, data) => {
    return template.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] || '');
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send email function
exports.sendEmail = async (to, subject, content, buttonText = null, buttonLink = null) => {
    try {
        let emailTemplate = loadEmailTemplate();
        
        const dynamicData = {
            subject,
            to,
            content,
            buttonText: buttonText || '',
            buttonLink: buttonLink || '#',
        };

        const htmlContent = fillTemplate(emailTemplate, dynamicData);

        // const response = await resend.emails.send({
        //     from: process.env.EMAIL_FROM,
        //     to: [to],
        //     subject,
        //     html: htmlContent,
        // });
        const mailOptions = {
            from: `"MediPulse" <no-reply@medipulse.com>`,
            to: [to],
            subject,
            html: htmlContent,
        };
        const info = await transporter.sendMail(mailOptions);
        return mailOptions;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

// Send OTP Email
exports.sendOTP = async (to, otp) => {
    const content = `Your OTP is: <b>${otp}</b>. It expires in 10 minutes.`;
    await this.sendEmail(to, 'Your OTP Code', content);
};

// Send Password Reset Confirmation
exports.sendPasswordResetConfirmation = async (to) => {
    const content = 'Your password has been reset successfully. If this was not you, please contact support immediately.';
    await this.sendEmail(to, 'Password Reset Successful', content);
};