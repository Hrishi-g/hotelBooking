const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // req.token = token;
        req.user = decoded; // Store the user info in the request object
        // console.log(req.user);
        next(); // Proceed to the next middleware/route handler
    });
};
module.exports = authenticateToken;
