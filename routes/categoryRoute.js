const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

//Form dolduracağız onu göndereceğimiz için post kullandık(Postman'de denedim sıkıntısız oldu)
router.route('/').post(categoryController.createCategory);//http://localhost:3000/categories 

module.exports = router;
