const path = require('path');
const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  console.log(req.query);
  res.send('hello express!')
});
app.post('/index.html', (req, res) => res.send('hello post!'));
global.console.log('dirname: ', __dirname);
app.use(express.static(path.join(__dirname, '/dist')));

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