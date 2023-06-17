const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

//Form dolduracağız onu göndereceğimiz için post kullandık
router.route('/').post(courseController.createCourse);//courseController'daki createCourse'a gidecek
router.route('/').get(courseController.getAllCourse);
router.route('/:id').get(courseController.getCourse);



//http://localhost:3000/courses 
//bu adrese yapılacak her türlü post request createrCourse'u çalıştıracak

module.exports = router;
