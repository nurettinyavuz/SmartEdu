const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const bodyParser = require('body-parser');


const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
console.log("DB Connected Succesfully")
});

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIN = null;//Başlangıç değeri olarak null dedim yani 0 olarak tanımladım (İf koşulunda false olarak gözükür)

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
}));


//ROUTES
app.use('*', (req, res, next) => {//Yıldız koymamızınn nedeni hangi istek gelirse gelsin bozulmaması için * kullandık
  userIN = req.session.userID;
  next();//next yazmamızın nedeni diğer middlleware'a gitmesi için
});

app.use('/', pageRoute); //pageRoute'a yönlendirdi örneğin about sayfasını açmak içinde buradan yönlendirecek
app.use('/courses', courseRoute); //courses çağırıldığı zaman courseRoute'a gidecek sonradan courseController'a gidecek çalışacak
app.use('/categories', categoryRoute); //category çağırıldığı zaman categoryRoute'a gidecek sonradan categoryController'a gidecek çalışacak //http://localhost:3000/categories 
app.use('/users', userRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App startted on port ${port}`);
});


// Express-session kullanıcı bilgilerinin sunucu tarafında saklanmasını sağlayan araçlardır.