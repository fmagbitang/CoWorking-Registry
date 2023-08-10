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

    if (!user.email_verification){
      return res.status(401).json({ message: 'Please verify your email.'});
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send the JWT token on successful login
    const token = jwt.sign({ 
      userId: user.id,
      UserOrEmail: identifier,
      role: user.role,
      fname: user.fname,
      lname: user.lname,
      mobile: user.mobile
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
    console.log(payload);

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

const logout = async (req, res) => {
    try {
        // Assuming you are using JWT for authentication
        // Clear the token from the client-side (e.g., local storage)
        res.clearCookie('token'); // Clear the token cookie

        // Send a response indicating successful logout
        res.json({ message: 'Logout successful' });
    } catch (error) {
        // Handle any errors that might occur during logout
        res.status(500).json({ error: 'An error occurred during logout' });
    }
};


module.exports = {
  login,
  checkLogin,
  logout,
};
