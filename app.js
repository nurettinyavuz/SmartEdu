const express = require('express'); 

const app = express();

//Template Engine
app.set("view engine","ejs");

//Middlewares
app.use(express.static("public"));


app.get('/', function (req, res) {
  res.status(200).render('index',{
    page_name:"index"
  });
});
//page_name yazmamızın nedeni header kısmında hangi sayfa açıksa o sayfanın altında açık olduğu belli olsun diye yazdım
//Sonradan navigation'da page_name == about ise active ediyoruz (About örnek hangi sayfadaysak öyle yapacağız)
app.get('/about', function (req, res) {
  res.status(200).render('about',{
    page_name:"about" 
  });
});


const port = 3000;

app.listen(port, () => {
  console.log(`App startted on port ${port}`) ;
});
