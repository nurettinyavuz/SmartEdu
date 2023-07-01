const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

//Form dolduracağız onu göndereceğimiz için post kullandık(Postman'de denedim sıkıntısız oldu)
//teacher ve admin yazmamın nedeni roleMiddleare içinde eğer teacher veya admin seçildiyse onlara özel yetki verdim değilse default olarak student yaptım
router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse);//courseController'daki createCourse'a gidecek
router.route('/').get(courseController.getAllCourse);
//router.route('/:id').get(courseController.getCourse);
router.route('/:slug').get(courseController.getCourse);



//http://localhost:3000/courses 
//bu adrese yapılacak her türlü post request createrCourse'u çalıştıracak

module.exports = router;
