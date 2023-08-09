const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the homepage
router.get('/', (req, res) => {
  // Read the "index.html" file from the "public" folder and send it as the response
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;