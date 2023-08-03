const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID); //hangi kullanıcı giriş yaptıysa konsola o kullanıcının id'sini yazdırıyorum (req.session.userID hangi kullanıcı o an aktifse onun id'sini tutuyor)
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
    //register yazan kısım register.ejs sayfasıdır
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  //Burası sadece login sayfasını açmaya yarıyor işlemleri burada yapmayacağız
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {

  const outputMessage = `
  
  <h1>Mail Details </h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "arinyazilim@gmail.com", // gmail account
      pass: "bpwrtssmqdsdjdjw", // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart EDU Contact Form" <arinyazilim@gmail.com>', // sender address
    to: "gcekic@gmail.com", // list of receivers
    subject: "Smart EDU Contact Form New Message ✔", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).redirect('contact');

};
