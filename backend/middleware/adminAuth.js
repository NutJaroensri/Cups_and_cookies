const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Ensure only admins can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only' });
    }

    next();  // Allow access to the route
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
