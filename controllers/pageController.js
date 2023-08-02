exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);//hangi kullanıcı giriş yaptıysa konsola o kullanıcının id'sini yazdırıyorum (req.session.userID hangi kullanıcı o an aktifse onun id'sini tutuyor)
  res.status(200).render('index', {
    page_name: 'index',
  });
};

//page_name yazmamızın nedeni header kısmında hangi sayfa açıksa o sayfanın altında açık olduğu belli olsun diye yazdım
//Sonradan navigation'da page_name == about ise active ediyoruz (About örnek hangi sayfadaysak öyle yapacağız)
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {//register yazan kısım register.ejs sayfasıdır
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => { //Burası sadece login sayfasını açmaya yarıyor işlemleri burada yapmayacağız
  res.status(200).render('login', {
    page_name: 'login',
  });
};



exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

