var searchs = document.querySelectorAll(".search");
searchs.forEach(function (e) {
  var input = e.querySelector('input');
  var button = e.querySelector('button');
  input.addEventListener('input', function () {
    if (this.value == "") {
      button.classList.add('bi-search');
      button.classList.remove('bi-x-lg');
    } else {
      button.classList.remove('bi-search');
      button.classList.add('bi-x-lg');
    }
  })

  button.onclick = function () {
    if (this.classList.contains('bi-x-lg')) {
      input.value = "";
      button.classList.add('bi-search');
      button.classList.remove('bi-x-lg');
    }
  }
});
document.querySelectorAll(".win-check2").forEach(function(e){
  if(e.classList.contains('checked')){
    e.querySelector('.statu').innerHTML="开";
  }else{
    e.querySelector('.statu').innerHTML="关";
  }
  e.onclick=function(){
    if(e.classList.contains('checked')){
      e.classList.remove('checked');
      e.querySelector('.statu').innerHTML="关";
    }else{
      e.classList.add('checked');
      e.querySelector('.statu').innerHTML="开";
    }
  }
})