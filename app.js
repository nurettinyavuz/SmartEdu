const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
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

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//ROUTES
app.use('/', pageRoute); //pageRoute'a yönlendirdi örneğin about sayfasını açmak içinde buradan yönlendirecek
app.use('/courses', courseRoute); //courses çağırıldığı zaman courseRoute'a gidecek sonradan courseController'a gidecek çalışacak
app.use('/categories', categoryRoute); //category çağırıldığı zaman categoryRoute'a gidecek sonradan categoryController'a gidecek çalışacak //http://localhost:3000/categories 
app.use('/AvazPromo', categoryRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App startted on port ${port}`);
});
