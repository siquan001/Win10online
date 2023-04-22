var test={
  hash:'53634f4002b63334744c45314129afc1',
  albumid:'45759999'
}
var audio=document.getElementById("audio")
function bfmusic(hash,albumid){
  var longtime = new Date().getTime();
  var script = document.createElement('script');
  script.src = `https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=getData&hash=${hash.toUpperCase()}&dfid=2mScsJ16ucV81qLdzD238ELf&appid=1014&mid=1b211caf58cd1e1fdfea5a4657cc21f5&platid=4&album_id=${albumid}&_=${longtime}`;
  document.querySelector('body').append(script);
  script.onload=function(){
    script.remove();
    script=null;
  }
  oLRC = {
  ti: "", //&#27468;&#26354;&#21517;
  ar: "", //&#28436;&#21809;&#32773;
  al: "", //&#19987;&#36753;&#21517;
  by: "", //&#27468;&#35789;&#21046;&#20316;&#20154;
  offset: 0, //&#26102;&#38388;&#34917;&#20607;&#20540;&#65292;&#21333;&#20301;&#27627;&#31186;&#65292;&#29992;&#20110;&#35843;&#25972;&#27468;&#35789;&#25972;&#20307;&#20301;&#32622;
  ms: [] //&#27468;&#35789;&#25968;&#32452;{t:&#26102;&#38388;,c:&#27468;&#35789;}
};
}
var ys = 73;
var nowc = 0;
function getData(a){
  audio.setAttribute('src', a.data.play_url);
  document.querySelector('.gc .title').innerHTML = a.data.song_name;
  document.querySelector('.song .name').innerHTML = a.data.audio_name;
  document.querySelector('.song .album').innerHTML = a.data.album_name;
  var author_b = '';
  for (var i = 0; i < a.data.authors.length; i++) {
      if (i == a.data.authors.length - 1) {
          author_b += a.data.authors[i].author_name
      } else {
          author_b += a.data.authors[i].author_name + '&#12289;';
      }
  }
  document.querySelector('.gc .singer').innerHTML = author_b;
  document.querySelector('.controls .left img').src=a.data.img;
  audio.oncanplay=function(){
    audio.play();
    a = queryTime(audio.duration);
    document.querySelector('div.time span.c').innerHTML = a;
  }
  createLrcObj(a.data.lyrics);
  document.querySelector('.gcframe ul').innerHTML='';
  for (var i = 0; i < oLRC.ms.length; i++) {
      document.querySelector('.gcframe ul').innerHTML += '<li>' + oLRC.ms[i].c + '</li>';
  }
  document.querySelectorAll('.gcframe ul li')[0].classList.add('act');
  document.querySelector('.gcframe').setAttribute('style','--i:1;')
  if (a.data.has_privilege && a.data.privilege == 10) {
    new parent.Notice({
      title: "提示",
      icon: "../../img/kugou.jpg",
      showTime:3000,
      center: "\u7531\u4e8e\u8be5\u6b4c\u66f2\u5728\u9177\u72d7\u97f3\u4e50\u5e73\u53f0\u4e0a\u4e3a\u4ed8\u8d39\u6536\u542c\uff0c\u53ea\u80fd\u8bd5\u542c1\u5206\u949f\uff0c\u6240\u4ee5\u5728\u8fd9\u91cc\uff0c\u6211\u4eec\u4e5f\u53ea\u80fd\u83b7\u53d6\u5230\u4e00\u5206\u949f\u7684\u97f3\u4e50\uff0c\u5982\u679c\u60f3\u542c\u6574\u9996\u6b4c\uff0c\u8bf7\u4f60\u4e0b\u8f7d\u9177\u72d7\u97f3\u4e50APP\u3002",
      onclick: function (notice) {
        notice.close();
      }
    }).send();
  }
}
audio.ontimeupdate=function(){
  if(ismove) return;
  var time = parseInt(audio.currentTime);
  var stime = queryTime(time);
  var mstime = audio.currentTime;
  document.querySelector('div.time span.z').innerHTML = stime;
  document.querySelector('.progress').setAttribute('style','--i:'+ time / audio.duration * 100+'%');
  var nowa = 0;
  for (var i = 0; i < oLRC.ms.length; i++) {
      try {
          if (parseFloat(oLRC.ms[i].t) <= mstime && parseFloat(oLRC.ms[i + 1].t) > mstime) {
              nowa = i;
              break;
          }
      } catch (error) {
          if (parseFloat(oLRC.ms[i].t) <= mstime) {
              nowa = i;
              break;
          }
      }
  }
  nowc = nowa;
  var pds = ys - nowc * 41;
  document.querySelectorAll('.gcframe ul li').forEach(function(e) {
      e.classList.remove('act')
  });
  document.querySelectorAll('.gcframe ul li')[nowc].classList.add('act');
  document.querySelector('.gcframe').setAttribute('style','--i:'+(nowc+1)+';')
}
audio.onplay=function(){
  document.querySelector(".playbtn").classList.remove('bi-play-fill');
  document.querySelector(".playbtn").classList.add('bi-pause');
}
audio.onpause=function(){
  document.querySelector(".playbtn").classList.add('bi-play-fill');
  document.querySelector(".playbtn").classList.remove('bi-pause');
}
document.querySelector(".playbtn").onclick=function(){
  audio.paused?audio.play():audio.pause();
}
function queryTime(a) {
        var s = parseInt(a % 60);
        m = parseInt(a / 60);
        if (s < 10) {
            s = '0' + s;
        };
        if (m < 10) {
            m = '0' + m;
        }
        return m + ':' + s;
    }
var oLRC = {
  ti: "", //&#27468;&#26354;&#21517;
  ar: "", //&#28436;&#21809;&#32773;
  al: "", //&#19987;&#36753;&#21517;
  by: "", //&#27468;&#35789;&#21046;&#20316;&#20154;
  offset: 0, //&#26102;&#38388;&#34917;&#20607;&#20540;&#65292;&#21333;&#20301;&#27627;&#31186;&#65292;&#29992;&#20110;&#35843;&#25972;&#27468;&#35789;&#25972;&#20307;&#20301;&#32622;
  ms: [] //&#27468;&#35789;&#25968;&#32452;{t:&#26102;&#38388;,c:&#27468;&#35789;}
};
function createLrcObj(lrc) {
  if (lrc.length == 0) return;
  var lrcs = lrc.split('\n');
  for (var i in lrcs) {
      lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "");
      var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));
      var s = t.split(":");
      if (isNaN(parseInt(s[0]))) {
          for (var i in oLRC) {
              if (i != "ms" && i == s[0].toLowerCase()) {
                  oLRC[i] = s[1];
              }
          }
      } else { //&#26159;&#25968;&#20540;
          var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);
          var start = 0;
          for (var k in arr) {
              start += arr[k].length;
          }
          var content = lrcs[i].substring(start);
          for (var k in arr) {
              var t = arr[k].substring(1, arr[k].length - 1);
              var s = t.split(":");
              oLRC.ms.push({
                  t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
                  c: content
              });
          }
      }
  }
  oLRC.ms.sort(function(a, b) { //&#25353;&#26102;&#38388;&#39034;&#24207;&#25490;&#24207;
      return a.t - b.t;
  });
  /*
  for(var i in oLRC){ //&#26597;&#30475;&#35299;&#26512;&#32467;&#26524;
      console.log(i,":",oLRC[i]);
  }*/
}
var ismove=false;
document.querySelector(".progress").onclick=function(e){
  if(ismove){ismove=false;return;}
  var per=e.x/this.offsetWidth;
  this.setAttribute('style','--i:'+(per*100)+'%');
  audio.currentTime=audio.duration*per;
}
document.querySelector(".progress").onmousedown=function(e){
  var x=null,_this=this;
  document.onmousemove=function(e){
    ismove=true;
    x=e.x;
    var per=x/_this.offsetWidth;
    _this.setAttribute('style','--i:'+(per*100)+'%');
  }
  document.onmouseup=function(e){
    document.onmousemove=null;
    document.onmouseup=null;
    if(x!=null){
      audio.currentTime=audio.duration*x/_this.offsetWidth;
    }
  }
}
var startTime = new Date().getTime();
var his = 0;
var his2 = 0;
var his3 = -1;
var hlist = '';
document.querySelector(".search-box input").onkeydown=function(e){
  if(e.key=='Enter'){
    search();
  }
}
function search(){
  console.log('search');
  hlist='';
  document.querySelector(".searchlist").style.display='block';
  gets();
}

function callback123(a) {
  for (var i = 0; i < a.data.info.length; i++) {
      hlist += "<li data-hash='" + a.data.info[i].hash + "' data-album-id='" + a.data.info[i].album_id + "'>" +
          "<span class='dot'>" + (i + 1) + "</span>" +
          "<span class='name'>" + a.data.info[i].filename + "</span>" +
          "</li>";
  }
  // console.log(hlist);
  document.querySelector('.searchlist ul').innerHTML = hlist;
  if (hlist.trim() == '') {
      document.querySelector('.searchlist ul').innerHTML = '&#20160;&#20040;&#20063;&#27809;&#25214;&#21040;';
  }
  document.querySelectorAll('.searchlist li').forEach(e => {
      e.onclick = function() {
        bfmusic(e.getAttribute('data-hash'),e.getAttribute('data-album-id'));
        addInPlayList(e.getAttribute('data-hash'),e.getAttribute('data-album-id'),e.querySelector('span.name').innerHTML);
        document.querySelector(".searchlist").style.display='none';
      };
  });
  var endTime = new Date().getTime() - startTime;
  console.log('Time:' + endTime + 'ms');
}

function gets() {
  console.log(document.querySelector(".search-box input").value);
  var sc = document.createElement('script');
  var str = "https://mobiles.kugou.com/api/v3/search/song?format=jsonp&keyword=" +document.querySelector(".search-box input").value + "&page=1&pagesize=30&showtype=1&callback=callback123";
  sc.src = str;
  document.body.append(sc);
  sc.onload=function(){
    // sc.remove();
    sc=null;
  }
}

function addInPlayList(hash,albumid,name){
  var li=document.createElement('li');
  li.innerHTML=name;
  li.setAttribute('data-hash',hash);
  li.setAttribute('data-album-id',albumid);
  document.querySelector(".playlist .list").insertBefore(li,document.querySelector(".playlist .list li"));
  li.onclick=function(){
    document.querySelectorAll(".playlist .list li").forEach(e=>{
      e.classList.remove('act');
    })
    li.classList.add('act');
    bfmusic(this.getAttribute('data-hash'),this.getAttribute('data-album-id'));
  }
  document.querySelectorAll(".playlist .list li").forEach(e=>{
    e.classList.remove('act');
  })
  li.classList.add('act');
}

document.querySelector(".bi-chevron-left").onclick=function(){
  document.querySelector(".searchlist").style.display="none";
}
document.querySelector("#bs").onchange=function(){
  audio.playbackRate=parseFloat(this.value);
}
document.querySelector("#sy").onchange=function(){
  audio.volume=parseFloat(this.value);
}
audio.volume=0.5;
audio.onended=function(){
  document.querySelector(".bi-skip-end-fill").click();
}
document.querySelector(".bi-skip-start-fill").onclick=function(){
  var acted=document.querySelector(".playlist .list li.act");
  if(acted){
    if(acted.previousElementSibling){
      acted.previousElementSibling.click();
    }
  }
}
document.querySelector(".bi-skip-end-fill").onclick=function(){
  var acted=document.querySelector(".playlist .list li.act");
  if(acted){
    if(acted.nextElementSibling){
      acted.nextElementSibling.click();
    }
  }
}
document.querySelector(".bi-arrow-clockwise").onclick=function(){
  if(document.querySelector(".search-box input").value.trim()){
    search();
  }
}