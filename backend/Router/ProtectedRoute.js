const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const cookieParser = require('cookie-parser');
// const User = require('../models/User');

router.use(cookieParser());

router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; 
        console.log(req.user);
        console.log("User ID from token in Booking:", userId);
        return res.json({ valid: true });
    } catch (error) {
        console.error("Error retrieving user data:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
