const User = require('../models/User');

module.exports = (req, res, next) => {
    if(req.session.UserID){ //Zaten hesap açıksa kullanıcı register veya login sayfasını açmaya çalışırsa login sayfasına yönlendirecek
        return res.redirect('/');
    }
    next();
  };