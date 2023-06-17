const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body); //Kurs açmak için form'dan bilgileri alacağız
    //try-catch yapmamızın nedeni hatayı yakalamak için
    res.status(201).json({
      //Oluşturulan yeni kursu template'e göndermiyoruz json dosyasında saklıyacaağız
      status: 'success',
      course,
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
exports.getAllCourse = async (req, res) => {
  try {
    //try-catch yapmamızın nedeni hatayı yakalamak için
    const courses = await Course.find(); //Tüm kursları sıraladı
    /*    res.status(200).json({
        //Oluşturulan yeni kursu template'e göndermiyoruz json dosyasında saklıyacaağız
        status: 'success',
        courses,
      });
     */
    res.status(200).render('courses', {
      courses,
      page_name: 'courses',
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

//TEKİL KURS
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });

    res.status(200).render('course', {//Burada yazan isim ejs sayfası
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
