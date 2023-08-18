const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/routes');
const indexRoutes = require('./routes/index');
const cors = require('cors');
// Load environment variables from .env file
require('dotenv').config();

const app = express();
// path for public images, css or js
app.use(express.static('public'));
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// add cors origin
app.use(cors());
const corsOptions = {
  origin: '*', // Specify the allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  optionsSuccessStatus: 204, // Specify the status code for preflight success
};

app.use(cors(corsOptions)); 

// Routes
app.use('/api', userRoutes);
// Routes for frontend
app.use('/', indexRoutes);


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
