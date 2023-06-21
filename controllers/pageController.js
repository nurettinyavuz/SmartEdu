exports.getIndexPage = (req, res) => {
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
  res.status(200).render('register', {
    page_name: 'register',
  });
};
