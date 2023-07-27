const User = require('../models/userModel');

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
  const { name, email, mobile, password } = req.body;
  try {
    created_at = today.toISOString();
    updated_at = today.toISOString();

    const user = await User.create({ name, email, mobile, password, created_at, updated_at });
    res.status(201).json(user);
  } catch (err) {
    next(err);
    console.log('error: ' + err.message);
  }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, mobile, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
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
