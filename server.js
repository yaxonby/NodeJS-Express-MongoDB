var http = require("http");
var url = require("url");
var querystring = require("querystring");
var static = require("node-static");
var express = require("express");
var bodyParser = require("body-parser");
const config = require('./config');

var app = express();

const users = ["Andrey", "Sergey", "Yura"];

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", {
    title: "server NodeJS",
    users: users
  });
});

app.get("/create", function (req, res) {
  res.render("create");
});

app.post("/create", function (req, res) {
  console.log(req.body);
  users.push(req.body.text);
  res.redirect("/");
});

app.listen(config.PORT, () => {
  console.log(`сервер запущен на порту ${config.PORT}`);
});

app.use(express.static("."));