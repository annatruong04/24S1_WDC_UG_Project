function isAuthenticated(req, res, next) {
    if (!req.session.username) {
      return res.status(401).send('You need to log in to access this resource.');
    }
    next();
  }

  function hasRole(role) {
    return (req, res, next) => {
      if (req.session.role === 'Administrator') next();
      if (!req.session.username || req.session.role !== role ) {
        return res.status(403).send('You do not have permission to access this resource.');
      }
      next();
    };
  }

module.exports = { isAuthenticated, hasRole };
