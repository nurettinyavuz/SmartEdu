const User = require('../models/User');

module.exports = (req, res, next) => {
  const userID = req.session.userID;
  User.findById(userID)
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      next();
    })
    .catch((err) => {
      return res.redirect('/login');
    });
};
