var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var express = require('express');
var app = express();

var file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {
    console.log('пришел запрос-',req.url);
    file.serve(req, res);
}

// ------ запустить сервер -------
if (!module.parent) {
    console.log('запуск сервера');
  http.createServer(accept).listen(8081);
  console.log('сервер запущен на порту 8081');
} else {
    console.log('сервер не запускается');
  exports.accept = accept;
}


// express
 
// app.get('/', function (req, res) { res.send('Hello World') })
 
app.listen(3000);
console.log('сервер запущен на порту 3000');
app.use(express.static('.'));