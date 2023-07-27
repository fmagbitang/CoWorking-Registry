const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const SECRET_KEY = process.env.SECRET_KEY; // Replace with your actual secret key for JWT

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send the JWT token on successful login
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err.message);
    next(err);
  }
};

module.exports = {
  login,
};
