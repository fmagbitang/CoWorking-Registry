const User = require('../models/userModel');
const sendEmail = require('../config/mailerConfig');

const timeElapsed = Date.now(); // get the date now
const today = new Date(timeElapsed); // formated a date today.

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
      created_at, 
      updated_at
    });

    // Send welcome email
    const welcomeMessage = 'Thank you for registering with our app!';
    sendEmail(email, 'Welcome to Our App', welcomeMessage);

    res.status(201).json(user);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, username, role, email, mobile, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
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
    user.password = password;
    user.updated_at = today.toISOString();
    await user.save();
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
};
