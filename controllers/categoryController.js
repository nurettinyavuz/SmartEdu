const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      //try-catch yapmamızın nedeni hatayı yakalamak için
      res.status(201).json({
        status: 'success',
        category,
      });
    } catch (error) {
      res.status(400).json({
        //Hatalı request gönderilirse dönecek
        //Oluşturulan yeni kursu template'e göndermiyoruz json dosyasında saklıyacaağız
        status: 'fail',
        error,
      }); 
    }
  };
   
  //Listelemek için
  exports.getAllCategory = async (req, res) => {
    try {
      //try-catch yapmamızın nedeni hatayı yakalamak için
      const category = await Category.find(); //Tüm kursları sıraladı
      res.status(200).render('category', {
        category,
        page_name: 'category',
      });
    } catch (error) {
      res.status(400).json({
        //Hatalı request gönderilirse dönecek
        //Oluşturulan yeni kursu template'e göndermiyoruz json dosyasında saklıyacaağız
        status: 'fail',
        error,
      });
    }
  };

  