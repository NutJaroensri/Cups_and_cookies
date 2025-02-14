const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User'); // Ensure User model is imported

// GET all users (Admin only)
router.get('/manage-users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    if (!users) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;
