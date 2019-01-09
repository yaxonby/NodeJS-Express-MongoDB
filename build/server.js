"use strict";

var path = require('path');

var express = require('express');

var app = express();

var bodyParser = require("body-parser");

var formidableMiddleware = require('express-formidable');

app.use(formidableMiddleware());
app.use(bodyParser.urlencoded({
  extended: false
}));

var myLogger = function myLogger(req, res, next) {
  console.log('I use "use" Time:', Date.now());
  next();
};

app.use(myLogger);
app.set('views', './views');
app.set('view engine', 'pug');
var port = 3000;
var users = ['Tolik', 'Lena'];
app.get('/pug', function (req, res) {
  res.render('index', {
    users: users
  });
});
app.get('/form', function (req, res) {
  console.log(req.query);
  res.send('hello form!');
});
app.get('/get', function (req, res) {
  console.log(req.query);
  res.send('hello get!');
});
app.post('/post', function (req, res) {
  console.log(req.body, req.fields);
  console.log('пришел');
  res.send('hello post!');
});
global.console.log('dirname: ', __dirname);
app.use(express.static(path.join(__dirname, '/dist')));
app.listen(port, global.console.log("Run server on port ".concat(port)));
/*
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var static = require("node-static");
var express = require("express");
var bodyParser = require("body-parser");
const config = require("./config");

var app = express();

const users = ["Andrey", "Sergey", "Yura"];

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", {
    title: "server NodeJS",
    users: users
  });
});

app.get("/create", function(req, res) {
  res.render("create");
});

app.post("/create", function(req, res) {
  console.log(req.body);
  users.push(req.body.text);
  res.redirect("/");
});

app.listen(config.PORT, () => {
  console.log(`сервер запущен на порту ${config.PORT}`);
});

app.use(express.static(".")); //
*/