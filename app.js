const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');


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

//ROUTES
app.use('/', pageRoute); //pageRoute'a yönlendirdi örneğin about sayfasını açmak içinde buradan yönlendirecek
app.use('/courses', courseRoute); //courses çağırıldığı zaman courseRoute'a gidecek sonradan courseController'a gidecek çalışacak


const port = 3000;

app.listen(port, () => {
  console.log(`App startted on port ${port}`);
});
