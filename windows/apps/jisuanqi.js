window.onresize=r;
var nc=null;
var fh=null;
function r(){
    document.body.style.width=window.innerWidth+'px';
    document.body.style.height=window.innerHeight+'px';
}
r();
function $(a){
    var a=document.querySelectorAll(a)
    return a.length<=1?a[0]:a;
}
$('.num').forEach(function(e){
    e.onclick=function(){
        if($('.show_frame .log').innerText=="0"){
            $('.show_frame .log').innerText=e.innerText;
        }else if($('.show_frame .log').innerText.length>=17){}
        else{
            $('.show_frame .log').innerText+=e.innerText;
            if($('.show_frame .log').innerText.length>10){
                $('.show_frame .log').style.fontSize="24px"
            }else{
                $('.show_frame .log').style.fontSize="46px"
            }
        }
    }
})
$('.jia').onclick=function(){
    fhclick('+');
}
$('.jian').onclick=function(){
    fhclick('-');
}
$('.chen').onclick=function(){
    fhclick('*');
}
$('.chu').onclick=function(){
    fhclick('/');
}
$('.dengyu').onclick=function(){
    if(fh){
        var result=js(nc,fh,parseFloat($('.show_frame .log').innerText));
        fh=null;
        nc=null;
        $('.show_frame .mes').innerText='';
        $('.show_frame .log').innerText=result;
        if($('.show_frame .log').innerText.length>10){
            $('.show_frame .log').style.fontSize="24px"
        }else{
            $('.show_frame .log').style.fontSize="46px"
        }
    }
}
$('.allc').onclick=function(){
    fh=null;
    nc=null;
    $('.show_frame .mes').innerText='';
    $('.show_frame .log').innerText='0';
    $('.show_frame .log').style.fontSize="46px"
}
$('.backspace').onclick=function(){
    var t=$('.show_frame .log').innerText;
    if(!(t=='0'||t.length==0)){
        t=t.substring(0,t.length-1);
        if(t==''){
            t='0';
        }
    }
    $('.show_frame .log').innerText=t;
}
$('.logc').onclick=function(){
    $('.show_frame .log').innerText='0';
    $('.show_frame .log').style.fontSize="46px"
}
$('.point').onclick=function(){
    var t=$('.show_frame .log').innerText;
    if(!(t==''||t.indexOf('.')!=-1)){
        t+='.';
    }
    $('.show_frame .log').innerText=t;
    if($('.show_frame .log').innerText.length>10){
        $('.show_frame .log').style.fontSize="24px"
    }else{
        $('.show_frame .log').style.fontSize="46px"
    }
}
$('.zorf').onclick=function(){
    var t=$('.show_frame .log').innerText;
    t=0-parseFloat(t);
    $('.show_frame .log').innerText=t;
    if($('.show_frame .log').innerText.length>10){
        $('.show_frame .log').style.fontSize="24px"
    }else{
        $('.show_frame .log').style.fontSize="46px"
    }
}
$('.percent').onclick=function(){
    var t=$('.show_frame .log').innerText;
    t=parseFloat(t)/100;
    $('.show_frame .log').innerText=t;
    if($('.show_frame .log').innerText.length>10){
        $('.show_frame .log').style.fontSize="24px"
    }else{
        $('.show_frame .log').style.fontSize="46px"
    }
}
$('.xfz1').onclick=function(){
    var t=$('.show_frame .log').innerText;
    t=1/parseFloat(t);
    $('.show_frame .log').innerText=t;
    if($('.show_frame .log').innerText.length>10){
        $('.show_frame .log').style.fontSize="24px"
    }else{
        $('.show_frame .log').style.fontSize="46px"
    }
}
$('.xdpf').onclick=function(){
    var t=$('.show_frame .log').innerText;
    t=t*t;
    $('.show_frame .log').innerText=t;
    if($('.show_frame .log').innerText.length>10){
        $('.show_frame .log').style.fontSize="24px"
    }else{
        $('.show_frame .log').style.fontSize="46px"
    }
}
$('.ghx').onclick=function(){
    var t=$('.show_frame .log').innerText;
    t=Math.sqrt(t);
    $('.show_frame .log').innerText=t;
    if($('.show_frame .log').innerText.length>10){
        $('.show_frame .log').style.fontSize="24px"
    }else{
        $('.show_frame .log').style.fontSize="46px"
    }
}
function fhclick(fhn){
    if($('.show_frame .log').innerText==''){
        fh=fhn;
        $('.show_frame .mes').innerText=nc+fhn;
        return;
    }
    if(nc==null){
        nc=parseFloat($('.show_frame .log').innerText);
    }else{
        nc=js(nc,fh,parseFloat($('.show_frame .log').innerText));
    }
    fh=fhn;
    $('.show_frame .mes').innerText=nc+fhn;
    $('.show_frame .log').innerText='';
}
function js(a,b,c){
    if(b=='+'){
        return a+c;
    }else if(b=='-'){
        return a-c;
    }else if(b=='*'){
        return a*c;
    }else if(b=='/'){
        return a/c;
    }
}