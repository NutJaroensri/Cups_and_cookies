const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, phone, password, role, subscription } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      let phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ msg: 'Phone number is already registered' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        role: role || 'user',  // Default to 'user' if not provided
        subscription: subscription || 'none'  // Default to 'none' if not provided
      });
  
      await user.save();
  
      const payload = { user: { id: user.id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const payload = { user: { id: user.id, role: user.role, subscription: user.subscription } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, role: user.role, subscription: user.subscription });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
