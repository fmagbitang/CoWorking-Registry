const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the homepage
router.get('/', (req, res) => {
  // Read the "index.html" file from the "public" folder and send it as the response
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Route for the create properties fot the owner
router.get('/owner/properties/', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/propeties.html'));
});

//Route for the create workspace fot the owner
router.get('/owner/workspace/', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/workspace.html'));
});

router.get('/homePage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/homePage.html'))
});

module.exports = router;
