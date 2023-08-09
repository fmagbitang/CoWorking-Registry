const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const User = require('../models/userModel');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; // Replace with your actual secret key for JWT

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: 'Username or email is required.' });
    }

    // Find the user by checking both username and email
    const user = await User.findOne({
      where: Sequelize.or(
        { username: identifier }, // Check if the identifier matches the username field
        { email: identifier } // Check if the identifier matches the email field
      ),
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or email.' });
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send the JWT token on successful login
    const token = jwt.sign({ 
      userId: user.id,
      UserOrEmail: identifier,
      role: user.role 
    }, SECRET_KEY, { expiresIn: '5h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
};

async function checkLogin(token) {
  try {
    // Decode JWT payload
    const jwtParts = token.split('.');
    const base64Payload = jwtParts[1];
    const decodedPayload = atob(base64Payload);
    const payload = JSON.parse(decodedPayload);

    // Check if the token is still valid (optional)
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiry = payload.exp; // Expiry time from the payload

    if (currentTime < tokenExpiry) {
      return {
        loggedIn: true,
        userId: payload.sub,
        username: payload.name
      };
    } else {
      return {
        loggedIn: false
      };
    }
  } catch (error) {
    return {
      loggedIn: false
    };
  }
}

module.exports = {
  login,
  checkLogin,
};
