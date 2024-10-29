const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, mobile, password, inviteCode, country } = req.body;

  // Check for existing username or mobile
  try {
    const existingUser = await User.findOne({
        $or: [{ username }, { mobile }] 
    //$or Operator: This MongoDB operator is used to specify multiple conditions. Here, it checks if either the username or mobile number already exists in the database.
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.username === username 
          ? 'Username already exists.' 
          : 'Mobile number already exists.'
      });
    }

    // Create new user if no conflicts
    const newUser = new User({ username, mobile, password, inviteCode, country });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
