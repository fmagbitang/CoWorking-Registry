
const isOwner = (req, res, next) => {
    const user = req.user; // Assuming you have set the authenticated user object in req.user
    console.log(user);
    console.log(user.role);
  
    // Check if the user is an owner (adjust the condition based on your role management system)
    if (user.role === 'owner') {
      next(); // User is an owner, proceed to the next middleware/controller
    } else {
      res.status(403).json({ message: 'You are not authorized to access this resource.' });
    }
  };
  
  module.exports = isOwner;