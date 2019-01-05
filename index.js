console.log('hi!!!-');

function loadPhones() {
   const xhr=new XMLHttpRequest();
   console.log(xhr.readyState)
   xhr.open('GET','/phones.json', true);
   console.log(xhr.readyState)
   xhr.send();
   xhr.onreadystatechange = () => {
console.log(xhr.readyState)
   }
   console.log(xhr);
  }