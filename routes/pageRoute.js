const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

//app.js'den gelen yönlendirmeye göre kullanıcı hangi sayfayı açtıysa o sayfaya gider
//ve PageController'a hangi sayfa açılacaksa o sayfanın açılması için istek gönderir

//Yani linkteki uzantıda /about varsa getAboutPage yolunu izleyecek
//Linkteki uzantı ise navigation.ejs dosyasından yapıyoruz
router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);//Register sayfasını açmak için için pageRoute kullandım ama kayıt olmak için userRoute kullanacağım
router.route('/login').get(pageController.getLoginPage);


module.exports = router;
