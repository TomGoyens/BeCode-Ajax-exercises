quote = document.getElementById('quote');
person = document.getElementById('quoter');
img = document.getElementById('photo');
button = document.getElementById('button');
xhr = new XMLHttpRequest();

button.addEventListener('click', function(){

  xhr.open('GET','https://thatsthespir.it/api',true);

  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      console.log(this.responseText)
      var obj = JSON.parse(this.responseText);
      quote.innerHTML = "\"" + obj.quote + "\"";
      person.innerHTML = "-" + obj.author;
      img.setAttribute('src', obj.photo);
    }
  };

  xhr.onerror = function(){
    alert("request error...");
  }

  xhr.send();
});
