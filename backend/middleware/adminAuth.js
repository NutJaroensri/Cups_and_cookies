const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Remove "Bearer " prefix if present
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Fetch the user from the database
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};
