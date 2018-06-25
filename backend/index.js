const express = require('express');
const bodyParser = require('body-parser'); 
const routes = require('./routes');
const app = express();

/*app.get('/', function (req, res) {
  console.log(1);
  res.send('Hello World from backend!');
});*/

//app.listen(3001, function () {
//  console.log('Example app listening on port 3001!');
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/search', routes.search);

app.listen(3001, function(){
  console.log('Example app listening on port 3001!');
});