const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const subscriptionAuth = require('../middleware/subscriptionAuth');

// Public Content - Available to everyone (even guests)
router.get('/public', (req, res) => {
  res.json({ msg: 'Welcome! This is public content for all users.' });
});

// Free User Content - Requires login but no subscription
router.get('/free', auth, (req, res) => {
  res.json({ msg: 'Welcome! Free content is available for all registered users.' });
});

// Premium User Content - Only accessible by premium subscribers
router.get('/premium', auth, subscriptionAuth('premium'), (req, res) => {
  res.json({ msg: 'Welcome Premium User! Enjoy exclusive content.' });
});

// Basic or Premium Users - Some content available to both
router.get('/basic-premium', auth, (req, res) => {
  if (req.user.subscription === 'basic' || req.user.subscription === 'premium') {
    return res.json({ msg: 'Welcome! Basic and Premium users can access this content.' });
  }
  res.status(403).json({ msg: 'Access denied. Upgrade your subscription to view this content.' });
});

module.exports = router;
