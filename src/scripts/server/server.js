const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const formidableMiddleware = require('express-formidable');
const config = require("../../../config.js");
const database = require("../../../database.js");
let Post = require("./mongo/models/post.js");
//var mongoose = require("mongoose");

//app.use(formidableMiddleware());

let users = ["Tolik", "Lena"];
let posts = [{
  title: "Двигатель",
  author: "Юра",
  body: "выгнало масло из двигателя"
}];
const port = config.PORT;

database()
  .then(info => {
    global.console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    app.listen(port, () => {
      Post.find(function (err, record) {
        if (err) return global.console.error('ошибка', err);
        global.console.log('запись ', record);
        posts = record;
      });

      global.console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch(() => {
    global.console.error("Unable to connect to database");
    process.exit(1);
  });

//MongoDB

function blog(req) {
  const {
    title,
    author,
    body
  } = req.body;

  var postUser = new Post({
    title,
    author,
    body
  });


  postUser
    .save()
    .then(add => global.console.log("добавлено", add))
    .catch(error => global.console.log(error));

  Post.find(function (err, record) {
    if (err) return global.console.error(err);
    global.console.log(record);
    posts = record;
  });
}

function blogFind() {
  Post.find(function (err, record) {
    if (err) return global.console.error(err);
    global.console.log(record);
    posts = record;
  });
}

// Server
//-------

//Routers

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var myLogger = function (req, res, next) {
  global.console.log('I use "use" Time:', Date.now());
  next();
};

app.use(myLogger);

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/pug", function (req, res) {
  res.render("index", {
    users: users
  });
});

app.get("/create", function (req, res) {
  blogFind();
  res.render("create", {
    posts: posts
  });
});

app.post("/create", function (req, res) {
  global.console.log(req.body);
  //users.push(req.body);
  blog(req);
  res.render("create", {
    posts: posts
  });
});

app.get("/form", (req, res) => {
  global.console.log(req.query);
  res.send("hello form!");
});

app.get("/get", (req, res) => {
  global.console.log(req.query);
  res.send("hello get!");
});

app.post("/post", (req, res) => {
  global.console.log(req.body, req.fields);
  global.console.log("пришел");
  res.send("hello post!");
});

app.use(express.static(path.join(__dirname, "/build")));

//run server

//app.listen(port, () => global.console.log(`Example app listening on port ${port}!`));