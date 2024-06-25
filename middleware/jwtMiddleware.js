const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if token is not provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.id; // Add the decoded user ID to the request object
    next(); // Pass control to the next middleware
  });
};
