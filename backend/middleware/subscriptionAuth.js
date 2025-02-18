const jwt = require('jsonwebtoken');

module.exports = function (requiredSubscription) {
  return (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      // Check subscription level
      if (req.user.subscription !== requiredSubscription) {
        return res.status(403).json({ msg: `Access denied. Requires ${requiredSubscription} subscription.` });
      }

      next();  // Proceed if subscription matches
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};
