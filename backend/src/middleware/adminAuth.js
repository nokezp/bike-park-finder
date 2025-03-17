/**
 * Middleware to check if the authenticated user is an admin
 * This middleware should be used after the auth middleware
 */
function adminAuth(req, res, next) {
  try {
    // Check if the user has admin privileges
    if (!req.user.isAdmin) {
      return res.status(403).send({ error: 'Access denied. Admin privileges required.' });
    }
    
    next();
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
}

module.exports = adminAuth; 