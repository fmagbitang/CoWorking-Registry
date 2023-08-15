const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the homepage
router.get('/', (req, res) => {
  // Read the "index.html" file from the "public" folder and send it as the response
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Route for the create properties fot the owner
router.get('/properties', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/propeties.html'));
});

//Route for the create workspace fot the owner
router.get('/workspace', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/workspace.html'));
});

router.get('/homePage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/homePage.html'))
});

router.get('/myProperties', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/myProperties.html'))
});

router.get('/myBookings', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/myBookings.html'))
});

module.exports = router;
