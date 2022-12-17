var f=document.getElementById('frame');
var h=['https://bing.com/'];
document.querySelector('.top input').onkeydown=function(e){
    if(e.keyCode==13){
        e.preventDefault();
        var a=this.value.trim();
        if(!a) return;
        if(a.indexOf('.')>0){
            if(a.indexOf('://')==-1){
                a='https://'+a;
            }  
        }else{
            a='https://cn.bing.com/search?q='+a;
        }
        f.src=a;
        h.push(a);
    }
}
document.querySelectorAll('.links a').forEach(function(element) {
    element.onclick=function(){
        var l=this.getAttribute('data-href');
        f.src=l;
        h.push(l);
    }
});
document.querySelector('.back').onclick=function(){
    if(h.length==1) return;
    f.src=h[h.length-2];
    h.pop();
}
document.querySelector('.reload').onclick=function(){
    f.src='about:blank';
    f.onload=function(){
        f.src=h[h.length-1];
    }
}
document.querySelector('.home').onclick=function(){
    f.src='https://cn.bing.com/';
    h=['https://cn.bing.com/'];
}
