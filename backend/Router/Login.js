const express = require('express');
const User = require('../models/User');
const router = express.Router();
// const bcrypt = require('bcrypt'); // Assuming you're using bcrypt for password hashing
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

router.use(cookieParser());
router.post('/', async (req, res) => {
    const { mobile, password,country } = req.body;

    try {
        // Check if mobile and password are provided
        if (!country || !mobile || !password) {
            return res.status(400).json({ message: 'Country code, mobile number and password are required.' });
        }

        // Find user by mobile
        const user = await User.findOne({ country, mobile });
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the stored hashed password
        // const isMatch =  bcrypt.compare(password, user.password);
        // if (isMatch) {
        //     return res.status(200).json({
        //         message: "Login Successful",
        //         user: {
        //             username: user.username,
        //             country: user.country,
        //         }
        //     });
        // } else {
        //     return res.status(400).json({ message: 'Invalid password.' });
        // }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, mobile: user.mobile },  // Payload data
            JWT_SECRET,                                    // Secret key
            { expiresIn: '1h' }                            // Token expiry time
        );

        res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 3600000,
            });

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                username: user.username,
                country: user.country,
                mobile : user.mobile ,
                // password : user.password
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
