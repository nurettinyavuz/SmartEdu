const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.route('/signup').post(authController.createUser);//http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);//http://localhost:3000/users/dashboard
//Dashboard'a authMiddleware yazmamızın nedeni authMiddleware'a gidecek şuan hesap açık mı diye bakacak açık değilse hata gönderecek açıksa devam edecek (Bu yüzden önce onu kontrol ediyoruz sonra diğerine geçecek)
 
module.exports = router;