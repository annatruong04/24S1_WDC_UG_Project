function isAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.status(401).send('You need to log in to access this resource.');
    }
    next();
  }

  function hasRole(role) {
    return (req, res, next) => {
      if (!req.session.user || req.session.user.role !== role) {
        return res.status(403).send('You do not have permission to access this resource.');
      }
      next();
    };
  }

module.exports = { isAuthenticated, hasRole };
