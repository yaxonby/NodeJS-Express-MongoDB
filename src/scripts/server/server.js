const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const formidableMiddleware = require('express-formidable');

//app.use(formidableMiddleware());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var myLogger = function (req, res, next) {
  console.log('I use "use" Time:', Date.now())
  next()
}

app.use(myLogger);

app.set('views', './src/views');
app.set('view engine', 'pug');

const port = 3000;
let users = ['Tolik', 'Lena'];

app.get('/pug', function (req, res) {
  res.render('index', {
    users: users
  })
});

app.get('/create', (req, res) => res.render('create'));

app.post("/create", function (req, res) {
  console.log(req.body);
  users.push(req.body.text);
  res.redirect("/pug");
});

app.get('/form', (req, res) => {
  console.log(req.query);
  res.send('hello form!');
});

app.get('/get', (req, res) => {
  console.log(req.query);
  res.send('hello get!')
});

app.post('/post', (req, res) => {
  console.log(req.body, req.fields);
  console.log('пришел');
  res.send('hello post!');
});

global.console.log('dirname: ', __dirname);

app.use(express.static(path.join(__dirname, '/build')));

app.listen(port, global.console.log(`Run server on port ${port}`));






















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