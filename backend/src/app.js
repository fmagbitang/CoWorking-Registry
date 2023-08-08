const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/routes');
const indexRoutes = require('./routes/index');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Routes
app.use('/', indexRoutes);
app.use('/api', userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  var message;
  if (err.message === 'Validation error: Validation isEmail on email failed') {
    message = 'Your email address is invalid.';
  } else if (err.message === 'Validation error: Email already exists in the database.') {
    message = 'This email address is already taken, please try different email address.';
  } else {
    message = 'Oops! Something went wrong.';
  }
  res.status(500).json({ error: message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
