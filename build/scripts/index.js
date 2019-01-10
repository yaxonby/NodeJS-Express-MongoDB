"use strict";

console.log("run client");
var random = Math.random();
console.log(random);
console.log(String(random).slice(2));

function loadGet(e) {
  var name = document.getElementById("name").value;
  var xhr = new XMLHttpRequest();
  var url = "/get" + "?name=" + encodeURIComponent(name);
  console.log(url);
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
    console.log(xhr.responseText);
  };

  xhr.send();
}

function loadGetFetch() {
  var name = document.getElementById("name").value;
  var url = "/get" + "?name=" + encodeURIComponent(name);
  var promise = fetch(url).then(function (response) {
    console.log("response-", response);
    console.log(response.headers.get("Content-Type"));
    console.log(response.headers.get("Date"));
    console.log(response.statusText);
  });
}

function loadPost() {
  var name = document.getElementById("surname").value;
  console.log(name);
  name = encodeURIComponent(name);
  console.log(name);
  var body = "name=" + name;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/post", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
  };

  xhr.send(body);
}

function loadPostFetch() {
  var name = document.getElementById("surname").value;
  name = encodeURIComponent(name);
  var body = "name=" + name;
  var promise = fetch("/post", {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: body
  }).then(function (response) {
    console.log(response);
    console.log(response.headers.get("Content-Type"));
    console.log(response.headers.get("Date"));
    console.log(response.statusText);
  }).catch(function (error) {
    console.log("error-", error);
  });
}

function loadPostData() {
  console.log(document.forms.formdata);
  var postData = new FormData(document.forms.formdata);
  postData.append("age", 21);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/post", true);
  console.log(postData);
  xhr.send(postData);
}

function loadPostDataFetch() {
  var postData = new FormData(document.forms.formdata);
  postData.append("age", 21);
  var url = "/post";
  var init = {
    method: "POST",
    body: postData
  };
  var request = new Request(url, init);
  fetch(request).then(function (response) {
    console.log(response.ok);
  });
}

function loadPostJson() {
  var name = document.getElementById("jsonname").value;
  console.log(name);
  var jsonData = JSON.stringify({
    name: name
  });
  console.log(jsonData);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/post", true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(jsonData);
}

;

function loadPostJsonFetch() {
  var name = document.getElementById("jsonname").value;
  var jsonData = JSON.stringify({
    name: name
  });
  console.log(jsonData);
  var url = '/post';
  var header = new Headers({
    "Content-type": "application/json; charset=utf-8"
  });
  var init = {
    method: 'POST',
    body: jsonData,
    headers: header
  };
  var request = new Request(url, init);
  fetch(request).then(function (response) {
    console.log(response.statusText);
  });
}

;

function loadPhones() {
  var xhr = new XMLHttpRequest();
  console.log(xhr.readyState);
  xhr.open("GET", "/phones.json", true);
  console.log(xhr.readyState);
  xhr.send();

  xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
  };

  console.log(xhr);
}