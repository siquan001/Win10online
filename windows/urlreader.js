!function(){
    var URLreadStr='?';
    var URLreader={
        read:function(str){
            URLreadStr=typeof str=='string'&&str?str:'?';
            readurl();
        },
        version:'1.0.0'
    }
    var readObj={};
    function readurl(){
        var url=decodeURI(location.href);
        if(url.indexOf(URLreadStr)==-1) return;
        url=url.substring(url.indexOf(URLreadStr)+URLreadStr.length,url.length);
        var cacheArray=url.split('&');
        for(var i=0;i<cacheArray.length;i++){
            if(cacheArray[i].indexOf('=')!=-1){
                readObj[cacheArray[i].substring(0,cacheArray[i].indexOf('='))]=cacheArray[i].substring(cacheArray[i].indexOf('=')+1,cacheArray[i].length);
            }
        }
    }
    readurl();
    function $_GET(str){
        if('string'!=typeof str||!str) return;
        return readObj[str];
    }
    window.$_GET=$_GET;
    window.URLreader=URLreader;
}();