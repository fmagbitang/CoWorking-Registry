const User = require('../models/userModel');
const emailService = require('../config/mailerConfig');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.
// import bcrypt
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get a user by ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Create a new 
const createUser = async (req, res, next) => {
  const { fname, lname, email, username, role, mobile, password } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();
    const userRole = role || 'coworker';

    const user = await User.create({ 
      fname,
      lname,
      email,
      username,
      mobile,
      role: userRole,
      password,
      email_verification: 0,
      created_at, 
      updated_at
    });

    // Send welcome email
    const subject = 'Email Verification';
    const text = 'Please confirm your email to continue using CoWorking Registry';
    const html = `
      <p>${text} Click <a href="http://localhost:3000/api/email_verification/${email}" target="_blank">here</a> to visit the masked link.</p>
    `;
    const toEmail = email; // Replace with the user's email
    await emailService.sendEmail(subject, text, toEmail, html);

    res.status(201).json(user);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { fname, lname, username, role, email, mobile, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fname = fname;
    user.lname = lname;
    if (email){
      user.email = email;
    }
    if (username){
      user.username = username;
    }
    if (role){
      user.role = role;
    }
    user.mobile = mobile;
    if (password){
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    user.updated_at = today.toISOString();
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update verification of email
const updateEmailVerification = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.update({email_verification: 1})
    
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Delete a user by ID
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    console.log('User has been deleted.');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateEmailVerification,
};
