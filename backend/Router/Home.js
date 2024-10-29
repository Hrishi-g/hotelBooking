const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

// A protected route (only accessible with a valid token)
router.get('/',authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Access the decoded userId
        console.log("User ID from token in Home:", userId);
        
        const user = await User.findById(userId); // Query the database with userId
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Send user profile data
        return res.status(200).json({
            username: user.username,
            country: user.country,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
