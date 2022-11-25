window.onresize=r;
function r(){
    document.body.style.width=window.innerWidth+'px';
    document.body.style.height=window.innerHeight+'px';
}
r();
document.onclick=function(){
    self.frameElement.parentElement.parentElement.click();
}