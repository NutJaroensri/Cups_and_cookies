const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User'); // Ensure User model is imported

// ✅ GET all users (Admin only)
router.get('/manage-users', adminAuth, async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    const users = await User.find().select('-password'); 

    if (!users.length) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;
