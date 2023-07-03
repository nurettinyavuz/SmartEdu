const User = require('../models/User');

module.exports = (req, res, next) => {
  const userID = req.session.userID;
  User.findById(userID)//userID'yi kullanarak User modelindeki kullanıcıyı bulmak için MongoDB'de bir sorgu yaparız
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      next();// Kullanıcı bulunduysa, bir sonraki middleware fonksiyonunu çalıştırmak için kullandık
    })
    .catch((err) => {
      return res.redirect('/login');//Promise hata durumunda, .catch() bloğu çalışır. Burada da kullanıcıyı login sayfasına yönlendiririz.
    });
};
 