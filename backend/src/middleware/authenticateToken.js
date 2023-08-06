const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

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

module.exports = authenticateToken;