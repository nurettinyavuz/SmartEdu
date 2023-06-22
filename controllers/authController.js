//Üye kaydı için kullalndığımız controller

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    //try-catch yapmamızın nedeni hatayı yakalamak için

    res.status(201).json({
      status: 'success',
      user,
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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;//İstek gövdesinden gelen email ve password değerlerini çıkartıyoruz.(Kullanıcıdan veriyi aldığımız kısım)
    const user = await User.findOne({ email });// Kullanıcıdan aldığınız email değeriyle, veritabanında User modelindeki email alanı eşleşen bir kullanıcı belgesini bulmak için 
    if (!user) { //Eğer bir kullanıcı bulunamazsa, bu blok çalışır.
      res.status(400).send('kullanici yok');
    }
    const same = await bcrypt.compare(password, user.password);// girilen şifrenin kullanıcının şifresiyle eşleşip eşleşmediğini kontrol eder
    if (same) {
      res.status(200).send('YOU ARE LOGGED IN');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
