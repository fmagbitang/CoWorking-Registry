const express = require('express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library
const router = express.Router();
const userController = require('../controllers/userController');  //  user controller
const workspaceController = require('../controllers/workspaceController');  //  workspace controller
const propertyController = require('../controllers/propertyController');  //  property controller
const leaseController = require('../controllers/leaseController');  //  lease controller
const { login } = require('../controllers/authController');

// Routes for create user 
router.post('/signup', userController.createUser);
// get all workspaces
router.get('/workspace/', workspaceController.getAllWorkspace);
// get all property
router.get('/property/', propertyController.getAllProperty);

// Route for user login
router.post('/login', login);


// Middleware for protecting routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token. Please log in.' });
  }
  console.log(process.env.SECRET_KEY);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
    req.user = user;
    next();
  });
};

// Protected routes
router.use(authenticateToken);

// Routes for get all users
router.get('/users/', userController.getAllUsers);
// Routes for get user by id
router.get('/users/:id', userController.getUserById);
// Route for update user
router.put('/users/:id', userController.updateUser);
// Route for delete user
router.delete('/users/:id', userController.deleteUser);

// Route for workspace
// create/add workspace
router.post('/workspace/create', workspaceController.createWorkspace);
// update workspace
router.post('/workspace/update/:id', workspaceController.updateWorkspace);
// Route for property
// create/add property
router.post('/property/create', propertyController.createProperty);
// Route for lease
// create/add lease
router.post('/lease/create', leaseController.createLease);
// get all lease
router.post('/lease/', leaseController.getAllLease);

// Protected route for getting user data
router.get('/', (req, res) => {
  // You can use the req.user to get information about the authenticated user if needed.
  res.json({ message: 'You have access to this protected route!' });
});

module.exports = router;
