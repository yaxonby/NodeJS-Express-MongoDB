console.log(1);
setTimeout(() => console.log(8), 0);
console.log(3);



console.log("run client");

let random = Math.random();
console.log(random);
console.log(String(random).slice(2));

function loadGet(e) {
   const name = document.getElementById("name").value;
   const xhr = new XMLHttpRequest();
   const url = "/get" + "?name=" + encodeURIComponent(name);
   console.log(url);
   xhr.open("GET", url, true);
   xhr.onreadystatechange = function () {
      console.log(xhr.readyState);
      console.log(xhr.responseText);
   };
   xhr.send();
}

function loadGetFetch() {
   const name = document.getElementById("name").value;
   const url = "/get" + "?name=" + encodeURIComponent(name);
   const promise = fetch(url).then(function (response) {
      console.log("response-", response);
      console.log(response.headers.get("Content-Type"));
      console.log(response.headers.get("Date"));
      console.log(response.statusText);
   });
}

function loadPost() {
   let name = document.getElementById("surname").value;
   console.log(name);
   name = encodeURIComponent(name);
   console.log(name);
   const body = "name=" + name;

   const xhr = new XMLHttpRequest();
   xhr.open("POST", "/post", true);
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.onreadystatechange = function () {
      console.log(xhr.readyState);
   };
   xhr.send(body);
}

function loadPostFetch() {
   let name = document.getElementById("surname").value;
   name = encodeURIComponent(name);
   const body = "name=" + name;

   const promise = fetch("/post", {
         method: "post",
         headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
         },
         body: body
      })
      .then(function (response) {
         console.log(response);
         console.log(response.headers.get("Content-Type"));
         console.log(response.headers.get("Date"));
         console.log(response.statusText);
      })
      .catch(function (error) {
         console.log("error-", error);
      });
}

function loadPostData() {
   console.log(document.forms.formdata);
   let postData = new FormData(document.forms.formdata);
   postData.append("age", 21);

   const xhr = new XMLHttpRequest();
   xhr.open("POST", "/post", true);
   console.log(postData);
   xhr.send(postData);
}

function loadPostDataFetch() {
   let postData = new FormData(document.forms.formdata);
   postData.append("age", 21);

   const url = "/post";
   const init = {
      method: "POST",
      body: postData
   };
   const request = new Request(url, init);
   fetch(request).then(response => {
      console.log(response.ok);
   });
}

function loadPostJson() {
   let name = document.getElementById("jsonname").value;
   console.log(name);
   const jsonData = JSON.stringify({
      name: name
   });
   console.log(jsonData);
   const xhr = new XMLHttpRequest();
   xhr.open("POST", "/post", true);
   xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
   xhr.send(jsonData);
};

function loadPostJsonFetch() {
   let name = document.getElementById("jsonname").value;
   const jsonData = JSON.stringify({
      name: name
   });
   console.log(jsonData);
   const url = '/post';
   const header = new Headers({
      "Content-type": "application/json; charset=utf-8"
   })
   const init = {
      method: 'POST',
      body: jsonData,
      headers: header
   };
   const request = new Request(url, init);
   fetch(request).then(response => {
      console.log(response.statusText);
   })
};

function loadPhones() {
   const xhr = new XMLHttpRequest();
   console.log(xhr.readyState);
   xhr.open("GET", "/phones.json", true);
   console.log(xhr.readyState);
   xhr.send();
   xhr.onreadystatechange = () => {
      console.log(xhr.readyState);
   };
   console.log(xhr);
}