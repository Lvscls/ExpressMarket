function authenticate(req, res, next) {
    if (!req.user) {
      return res.status(401).send('Accès non autorisé. Veuillez vous connecter.');
    }
    next();
  }
  
  module.exports = authenticate;
  