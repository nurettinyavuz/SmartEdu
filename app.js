const express = require('express'); 

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App startted on port ${port}`) ;
});
