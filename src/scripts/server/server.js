const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const formidableMiddleware = require('express-formidable');
const config = require('../../../config.js');
const database = require('../../../database.js');

//app.use(formidableMiddleware());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var myLogger = function (req, res, next) {
  global.console.log('I use "use" Time:', Date.now())
  next()
}

app.use(myLogger);

app.set('views', './src/views');
app.set('view engine', 'pug');

const port = config.PORT;
let users = ['Tolik', 'Lena'];

app.get('/pug', function (req, res) {
  res.render('index', {
    users: users
  })
});

app.get('/create', (req, res) => res.render('create'));

app.post("/create", function (req, res) {
  global.console.log(req.body);
  users.push(req.body.text);
  res.redirect("/pug");
});

app.get('/form', (req, res) => {
  global.console.log(req.query);
  res.send('hello form!');
});

app.get('/get', (req, res) => {
  global.console.log(req.query);
  res.send('hello get!')
});

app.post('/post', (req, res) => {
  global.console.log(req.body, req.fields);
  global.console.log('пришел');
  res.send('hello post!');
});

app.use(express.static(path.join(__dirname, '/build')));


//MongoDB
database()
  .then(info => {
    global.console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    app.listen(port, () =>
      global.console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(() => {
    global.console.error('Unable to connect to database');
    process.exit(1);
  });


// app.listen(port, global.console.log(`Run server on port ${port}`));