const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');  //  user controller
const workspaceController = require('../controllers/workspaceController');  //  workspace controller
const propertyController = require('../controllers/propertyController');  //  property controller
const leaseController = require('../controllers/leaseController');  //  lease controller
const authenticateToken = require('../middleware/authenticateToken'); // import authenticateToken in middleware
const isOwner = require('../middleware/isOwner'); // import isOwner role in middleware
const { login, verify, logout } = require('../controllers/authController');

// Routes for create user 
router.post('/signup', userController.createUser);
router.get('/verify_email/:email', userController.updateEmailVerification);
router.post('/forgot_passsword', userController.forgotPassword);
// get all workspaces
router.get('/workspace/', workspaceController.getAllWorkspace);
// get all property
router.get('/property/', propertyController.getAllProperty);

// Route for user login
router.post('/login', login);
router.get('/logout', logout);
// verify token of user
router.get('/verify', verify);


// Protected routes w
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
router.post('/workspace/create', isOwner, workspaceController.createWorkspace);
// update workspace
router.put('/workspace/update/:id', workspaceController.updateWorkspace);
// get workspace with user and property by ID
router.get('/workspace/:id', workspaceController.getWorkspaceByPropertyId);
// Route for property
// create/add property
router.post('/property/create', isOwner, propertyController.createProperty);
// list all property of owner
router.post('/property/:id', propertyController.getAllPropertyByOwner);
// Route for lease
// create/add lease
router.post('/lease/create', leaseController.createLease);
// get all lease
router.get('/lease/', leaseController.getAllLease);
// update a lease
router.post('/lease/:id', leaseController.updateLease);

// Protected route for getting user data
router.get('/', (req, res) => {
  // You can use the req.user to get information about the authenticated user if needed.
  res.json({ message: 'You have access to this protected route!' });
});

module.exports = router;
