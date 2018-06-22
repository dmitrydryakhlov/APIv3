let express = require('express');
let app = express();

app.get('/', function (req, res) {
  console.log(1);
  res.send('Hello World from backend!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log(22);
  // if (!req.body) return res.sendStatus(400);
  console.log(req);
  console.log(res.data);
  console.log(req.body);
});

app.post('http://localhost:3000/', function (req, res) {
  console.log(2);
  console.log(req.body);
    res.send('Got a POST request');
  });

app.post('localhost:3001/', (req, res) => {
    console.log(3);
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('about');
  });