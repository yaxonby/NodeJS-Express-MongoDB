"use strict";

var path = require("path");

var express = require("express");

var app = express();

var bodyParser = require("body-parser"); // const formidableMiddleware = require('express-formidable');


var config = require("../../../config.js");

var database = require("../../../database.js");

var Post = require("./mongo/models/post.js"); //var mongoose = require("mongoose");
//app.use(formidableMiddleware());


var users = ["Tolik", "Lena"];
var posts = [{
  title: "Двигатель",
  author: "Юра",
  body: "выгнало масло из двигателя"
}];
var port = config.PORT;
database().then(function (info) {
  global.console.log("Connected to ".concat(info.host, ":").concat(info.port, "/").concat(info.name));
  app.listen(port, function () {
    Post.find(function (err, record) {
      if (err) return global.console.error("ошибка", err);
      global.console.log("запись ", record);
      posts = record;
    });
    global.console.log("Example app listening on port ".concat(port, "!"));
  });
}).catch(function () {
  global.console.error("Unable to connect to database");
  process.exit(1);
}); //MongoDB
// Server
//-------
//Routers

app.use(bodyParser.urlencoded({
  extended: false
}));

var myLogger = function myLogger(req, res, next) {
  global.console.log('I use "use" Time:', Date.now());
  next();
};

app.use(myLogger);
app.set("views", "./src/views");
app.set("view engine", "pug");
app.use("/javascripts", express.static(path.join(__dirname, "../../../node_modules", "jquery", "dist")));
app.use("/styles", express.static(path.join(__dirname, "../../../build/styles")));
app.get("/pug", function (req, res) {
  res.render("index", {
    users: users
  });
});
app.get("/create", function (req, res) {
  Post.find(function (err, record) {
    if (err) return global.console.error(err);
    global.console.log(record);
  }).then(function (posts) {
    global.console.log("----------posts--------", posts);
    res.render("create", {
      posts: posts
    });
  });
});
app.post("/create", function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      author = _req$body.author,
      body = _req$body.body,
      created_at = _req$body.created_at;
  var postUser = new Post({
    title: title,
    author: author,
    body: body,
    created_at: created_at
  });
  postUser.save().then(function (add) {
    global.console.log("добавлено", add);
    Post.find(function (err, record) {
      if (err) return global.console.error(err);
      global.console.log(record);
    }).then(function (posts) {
      global.console.log("//////////////posts///////////////", posts);
      res.render("create", {
        posts: posts
      });
    }); //  res.render("create");
  }).catch(function (error) {
    return global.console.log(error);
  });
});
app.get("/form", function (req, res) {
  global.console.log(req.query);
  res.send("hello form!");
});
app.get("/get", function (req, res) {
  global.console.log(req.query);
  res.send("hello get!");
});
app.post("/post", function (req, res) {
  global.console.log(req.body, req.fields);
  global.console.log("пришел");
  res.send("hello post!");
}); //run server
//app.listen(port, () => global.console.log(`Example app listening on port ${port}!`));