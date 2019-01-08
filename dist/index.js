console.log('hi!!!-');

function loadPost() {
   const xhr = new XMLHttpRequest();
   xhr.open("POST", '/', true);
   xhr.onreadystatechange = function () {
      console.log(xhr.readyState)
   }
   xhr.send();
};

function loadGet(e) {
   const name = document.getElementById('name').value
   const xhr = new XMLHttpRequest();
   const url = '/' + '?name=' + encodeURIComponent(name);
   console.log(url);
   xhr.open("GET", url, true);
   xhr.onreadystatechange = function () {
      console.log(xhr.readyState);
      console.log(xhr.responseText);
   }
   xhr.send();
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