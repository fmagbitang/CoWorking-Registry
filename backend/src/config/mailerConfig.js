const nodemailer = require('nodemailer');
require('dotenv').config();
const EMAIL = process.env.EMAIL_USERNAME || 'sample@gmail.com';
const PASS = process.env.EMAIL_PASSWORD || 'mysecretpassword';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: EMAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
