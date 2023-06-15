const express = require('express'); 
const pageRoute =require('./routes/pageRoute');


const app = express();

//Template Engine
app.set("view engine","ejs");

//Middlewares
app.use(express.static("public"));

//ROUTES
app.use('/',pageRoute);//pageRoute'a yönlendirdi


const port = 3000;

app.listen(port, () => {
  console.log(`App startted on port ${port}`) ;
});
