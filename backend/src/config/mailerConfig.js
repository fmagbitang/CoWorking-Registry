const nodemailer = require('nodemailer');
require('dotenv').config();
const EMAIL = process.env.EMAIL_USERNAME || 'sample@gmail.com';
const PASS = process.env.EMAIL_PASSWORD || 'mysecretpassword';
const MAILER = process.env.MAILER || 'gmail';

async function sendEmail(subject, text, toEmail, html) {
    const transporter = nodemailer.createTransport({
      host: MAILER, // Replace with your SMTP server hostname
      port: 587, // Replace with your SMTP server port
      secure: false,
      auth: {
        user: EMAIL, // Replace with your email
        pass: PASS, // Replace with your email password or app password
      },
    });
  
    const mailOptions = {
      from: `Echo <${EMAIL}>`,
      to: toEmail,
      subject: subject,
      text: text,
      html: html,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  module.exports = { sendEmail };
