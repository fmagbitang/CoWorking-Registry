const express = require('express');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const cors = require('cors');
// Load environment variables from .env file
require('dotenv').config();
const path = require('path');
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
// this will fixed the cors issue connecting to api.
app.use(cors(corsOptions)); 

// Routes for frontend
app.use('/', indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  var message = 'Oops! Something went wrong.';
  res.status(500).json({ error: message });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
