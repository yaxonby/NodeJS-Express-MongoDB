var http = require("http");
var url = require("url");
var querystring = require("querystring");
var static = require("node-static");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
const users = ["Andrey", "Sergey", "Yura"];
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", { title: "server NodeJS", users: users });
});
app.get("/create", function(req, res) {
  res.render("create");
});
app.post("/create", function(req, res) {console.log(req.body); users.push(req.body.text);
  res.redirect("/");
});

app.listen(3000, () => {console.log("сервер запущен на порту 3000");
});
app.use(express.static("."));
