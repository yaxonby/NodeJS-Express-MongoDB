console.log('client !!!');

let random = Math.random();
console.log(random);
console.log(String(random).slice(2));

function loadGet(e) {
   const name = document.getElementById('name').value
   const xhr = new XMLHttpRequest();
   const url = '/get' + '?name=' + encodeURIComponent(name);
   console.log(url);
   xhr.open("GET", url, true);
   xhr.onreadystatechange = function () {
      console.log(xhr.readyState);
      console.log(xhr.responseText);
   }
   xhr.send();
}

function loadPost() {
   let name = document.getElementById('surname').value;
   console.log(name);
   name = encodeURIComponent(name);
   console.log(name);
   const body = 'name=' + name;

   const xhr = new XMLHttpRequest();
   xhr.open("POST", '/post', true);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.onreadystatechange = function () {
      console.log(xhr.readyState)
   }
   xhr.send(body);
};

function loadPostData() {
   console.log(document.forms.formdata);
   let postData = new FormData(document.forms.formdata);
   postData.append('age', 21);

   const xhr = new XMLHttpRequest();
   xhr.open('POST', '/post', true);
   console.log(postData)
   xhr.send(postData);
};

function loadPostJson() {
   let name = document.getElementById('jsonname').value;
   console.log(name);
   const jsonData = JSON.stringify({
      'name': name
   });
   console.log(jsonData);
   const xhr = new XMLHttpRequest();
   xhr.open('POST', '/post', true);
   xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
   xhr.send(jsonData);
}
















function loadPhones() {
   const xhr = new XMLHttpRequest();
   console.log(xhr.readyState)
   xhr.open('GET', '/phones.json', true);
   console.log(xhr.readyState)
   xhr.send();
   xhr.onreadystatechange = () => {
      console.log(xhr.readyState)
   }
   console.log(xhr);
}