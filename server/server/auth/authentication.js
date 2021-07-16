const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

module.exports = {
  isAuthenticated: (req, res, next) => {
    const token = req.headers['authorization'];
    
    console.log(token);
    token.replace(/Bearer\s+(.+)/i, (a, b) => {
      let token = b;
      console.log("does we log in");
      console.log(token);
      if (!token) return res.status(200).json({ success: false, message: 'No token provided'});
      
      jwt.verify(token, settings.development.secret, (err, decoded) => {
        if (err) return res.json({ success: false, message: err})

        req.decoded = decoded;
        next();
      })
    })
    
  },
  isInRole: (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next()
      } else {
        res.redirect('/users/login')
      }
    }
  }
}