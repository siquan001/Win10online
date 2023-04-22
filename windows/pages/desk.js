var
  /* 当前版本 */
  version = "0.7.6",
  _q = {
    'win': false,
    'other-run': false,
    'battery': false,
    'wifi': false,
    'sound': false,
    'time': false,
    'message': false,
  },
  // 用于QuickFrame的过场动画延时
  animateTimeout1,
  ZINDEX = 0;
// 为桌面图标添加点击事件
document.querySelectorAll('.desk li.desk-icon').forEach(function (f) {
  f.onclick = function (e) {
    e.stopPropagation();
    document.querySelectorAll('.desk li.desk-icon').forEach(function (g) { g.classList.remove('active') });
    this.classList.add('active');
  }
})
// 添加Win按钮事件
document.querySelector('.bar .left .win').onclick = function (e) {
  //阻止事件冒泡
  e.stopPropagation();
  quickframeToggler('win');
};
// 添加其它所有右侧的quickFrame按钮的点击事件
for (let k in _q) {
  // _q 包含了所有quickFrame的名称，其中Win按钮已添加事件，在这里要排除
  if (k != 'win') {
    document.querySelector('.bar .right .' + k).onclick = function (e) {
      //阻止事件冒泡
      e.stopPropagation();
      quickframeToggler(k);
    };
  }
}
function quickframeToggler(t) {
  // 清除原来的的定时器，以免造成混乱。
  clearTimeout(animateTimeout1);
  // 如果Toggle的quickFrame未打开（即为false），则打开
  if (!_q[t]) {
    // 设置所有QuickFrame为关闭动画
    document.querySelectorAll('.quick-frame').forEach(function (e) {
      e.style.animation = 'hide .2s';
    })
    // 设置目标QuickFrame为开启动画
    if (t == 'message') {// 判断是否为message-frame
      document.querySelector('.' + t + '-frame').style.animation = 'fright .3s';
    } else {
      document.querySelector('.' + t + '-frame').style.animation = 'totop .3s';
      document.querySelector('.message-frame').style.animation = 'fhide .3s';
    }
    // 让目标显示
    document.querySelector('.' + t + '-frame').style.display = "block";
    // 200ms动画完成后，隐藏其它的QuickFrame
    animateTimeout1 = setTimeout(function () {
      document.querySelectorAll('.quick-frame').forEach(function (e) {
        if (!e.classList.contains(t + '-frame')) {
          e.style.display = "none"
        }
      });
    }, 200);
    // 修改_q
    for (var key in _q) {
      _q[key] = false;
    }
    _q[t] = true;
    // 否则关闭所有
  } else {
    // 设置动画
    document.querySelectorAll('.quick-frame').forEach(function (e) {
      e.style.animation = 'hide .2s';
    })
    document.querySelector('.message-frame').style.animation = 'fhide .3s';
    // 200ms动画完成后，隐藏其它的QuickFrame
    animateTimeout1 = setTimeout(function () {
      document.querySelectorAll('.quick-frame').forEach(function (e) {
        e.style.display = 'none';
      })
    }, 200);
    // 修改_q
    for (var key in _q) {
      _q[key] = false;
    }
  }
}
// 阻止在点击QuickFrame内部时，事件冒泡
document.querySelectorAll('.quick-frame').forEach(function (f) {
  f.addEventListener('click', function (e) {
    e.stopPropagation();
    // 添加这个代码，以关闭电源菜单
    $('.darkthememenu>div').hide(300);
    // 添加这个代码，以让日历日期脱离焦点
    document.querySelectorAll('.time-frame .calendar .b table tbody td').forEach(function (e) {
      e.classList.remove('active');
    })
  })
})
// 全局点击事件
document.onclick = function () {
  // 在点击其它地方时，让桌面图标脱离焦点
  document.querySelectorAll('.desk li.desk-icon').forEach(function (f) {
    f.classList.remove('active');
  });
  // 在点击其它地方时，关闭QuickFrame
  if (document.querySelector('.message-frame').style.display == 'block') {
    document.querySelector('.message-frame').style.animation = 'fhide .2s';
  } else {
    document.querySelectorAll('.quick-frame').forEach(function (e) {
      e.style.animation = 'hide .2s';
    })
  }
  animateTimeout1 = setTimeout(function () {
    document.querySelectorAll('.quick-frame').forEach(function (e) {
      e.style.display = 'none';
    })
  }, 200);
  for (var key in _q) {
    _q[key] = false;
  }
  // 在点击其它地方时，关闭电源菜单
  $('.darkthememenu>div').hide(300);
  // 在点击其它地方时，让日历日期脱离焦点
  document.querySelectorAll('.time-frame .calendar .b table tbody td').forEach(function (e) {
    e.classList.remove('active');
  })
  // 在点击其它地方时，隐藏右键菜单
  document.querySelectorAll(".contextmenu").forEach(function (e) {
    e.style.display = "none";
  })
};

// 全局更新时间，频率为100ms一次
function updateTime() {
  document.querySelector('.bar .right .time p.t').innerHTML = new Date().getHours() + ':' + check(new Date().getMinutes()) + ':' + check(new Date().getSeconds());
  document.querySelector('.bar .right .time p.d').innerHTML = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
  document.querySelector('.time-frame .toptime .t').innerHTML = new Date().getHours() + ':' + check(new Date().getMinutes()) + ':' + check(new Date().getSeconds());
  document.querySelector('.time-frame .toptime .d').innerHTML = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日';
  function check(a) {
    if (a < 10) {
      a = '0' + a;
    }
    return a;
  }
}
setInterval(function () {
  updateTime();
}, 100)

// 制作开始菜单悬停展开功能
var winframeTimeout;
var winleft = document.querySelector('.win-frame .left-bar')
winleft.onmouseenter = function () {
  clearTimeout(winframeTimeout);
  winframeTimeout = setTimeout(function () {
    winleft.style.width = '200px';
    winleft.style.boxShadow = '1px 0 5px #0008';
    winleft.style.backgroundColor = '#10101044';
    winleft.style.backdropFilter = 'blur(10px)'
  }, 800)
  // 悬停800ms展开
};
winleft.onmouseleave = function () {
  clearTimeout(winframeTimeout);
  winleft.style.width = '50px';
  winleft.style.boxShadow = 'none';
  winleft.style.backgroundColor = 'transparent';
  winleft.style.backdropFilter = 'none'
}

// 点击开始按钮强制展开/关闭
document.querySelector('.win-frame .left-bar .start-item').onclick=function () {
  clearTimeout(winframeTimeout);
  if ($('.win-frame .left-bar').css('width') == '50px') {
    winleft.style.width = '200px';
    winleft.style.boxShadow = '1px 0 5px #0008';
    winleft.style.backgroundColor = '#10101044';
    winleft.style.backdropFilter = 'blur(10px)'
  } else {
    winleft.style.width = '50px';
    winleft.style.boxShadow = 'none';
    winleft.style.backgroundColor = 'transparent';
    winleft.style.backdropFilter = 'none'
  }

};

// 电源按钮点击事件：打开电源菜单
document.querySelector('.win-frame .left-bar .power-item').onclick=function (e) {
  e.stopPropagation();
  $('.darkthememenu>.power-menu').toggle(300);
};
// 设置按钮点击事件
document.querySelector('.win-frame .left-bar .setting-item').onclick=function () {
  var options = { "icon": "../../img/icon/settings.png", "url": "../apps/setting/setting.html", "offset": ["20px", "20px", "700px", "560px"], "title": "设置", "automax": true };
  for (var i = 0; i < POPUPS.length; i++) {
    if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
      POPUPS[i].show();
      xqwinframe();
      return;
    }
  }
  var p = new Popup(options);
  p.build().init();
  xqwinframe();
};

// 睡眠
document.querySelector('.darkthememenu>.power-menu .sleep-item').onclick=function () {
  document.getElementById("sleep-ifr").style.display="block";
  document.getElementById("sleep-ifr").src='user.html?mode=sleep';
}
// 关机
document.querySelector('.darkthememenu>.power-menu .poweroff-item').onclick=function () {
  location.href = 'poweroff.html';
}
// 重启
document.querySelector('.darkthememenu>.power-menu .restart-item').onclick=function () {
  location.href = 'poweroff.html?mode=restart';
};

// WinCheck：遍历所有WinCheck
document.querySelectorAll('.win-check').forEach(function (e) {
  // 点击切换状态
  e.addEventListener('click', function () {
    // 如果为禁用，不做任何更改
    if (this.classList.contains('disable')) {
    } else if (this.classList.contains('checked')) {// 如果选中，则取消并eval触发事件
      this.classList.remove('checked');
      var fnt = e.getAttribute('data-change');
      if (fnt) eval(fnt + '({value:false})');
    } else {// 如果未选中，则勾选并eval触发事件
      this.classList.add('checked');
      var fnt = e.getAttribute('data-change');
      if (fnt) eval(fnt + '({value:true})');
    }
  })
});

// WinRange：遍历所有WinRange
document.querySelectorAll('.win-range').forEach(function (e) {
  // 获取WinRange三要素：总长，已选，拖动
  var r1 = e.querySelector('span.r1');
  var r2 = e.querySelector('span.r2');
  var r3 = e.querySelector('span.r3');
  // 获取WinRange基本属性：最大，最小，默认
  var min = parseInt(e.getAttribute('data-min'));
  min = isNaN(min) ? 0 : min;
  var max = parseInt(e.getAttribute('data-max'));
  max = isNaN(max) ? 100 : max;
  var v = parseInt(e.getAttribute('data-value'));
  v = isNaN(v) ? 100 : v;
  // 实例化基本属性
  r2.style.width = 'calc((100% - 8px) * ' + (v - min) / (max - min) + ')';
  r3.style.left = 'calc((100% - 8px) * ' + (v - min) / (max - min) + ')';
  // 拖动条点击事件
  r1.addEventListener('click', function (event) {
    // 拖动条宽度
    var alw = r1.getBoundingClientRect().width;
    // 点击处位置
    var clickw = event.offsetX - 4;
    // 校准
    clickw = clickw < 0 ? 0 : clickw > alw ? 100 : clickw;
    // 计算
    var percent = clickw / alw;
    // 实例化
    r2.style.width = 'calc((100% - 8px) * ' + percent + ')';
    r3.style.left = 'calc((100% - 8px) * ' + percent + ')';
    e.setAttribute('data-value', (max - min) * percent + min);
    // eval触发事件
    var fnt = e.getAttribute('data-change');
    if (fnt) eval(fnt + '({min:' + min + ',max:' + max + ',value:' + ((max - min) * percent + min) + '})')
  });
  r3.addEventListener('mousedown', function (event) {
    event.preventDefault();
    // 拖动条宽度
    var alw = r1.getBoundingClientRect().width;
    var nx;
    // 拖动条距离屏幕左侧的宽度
    var l = r1.getBoundingClientRect().left;
    // 添加全局鼠标移动事件
    document.onmousemove = function (event) {
      // 点击处位置
      nx = event.pageX - l;
      // 校准
      nx = nx < 0 ? 0 : nx > alw ? alw : nx;
      // 计算
      var percent = nx / alw;
      // 实例化
      r2.style.width = 'calc((100% - 8px) * ' + percent + ')';
      r3.style.left = 'calc((100% - 8px) * ' + percent + ')';
      e.setAttribute('data-value', (max - min) * percent + min);
      event.preventDefault();
      // eval触发事件
      var fnt = e.getAttribute('data-change');
      if (fnt) eval(fnt + '({min:' + min + ',max:' + max + ',value:' + ((max - min) * percent + min) + '})');
    }
    // 添加全局鼠标抬起事件：取消全局事件
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  })
});

// 声音WinRange事件
function soundframechange(t) {
  var a0 = '../../img/icon/ui/audio';
  var a1 = '.png';
  var im = document.querySelector('.sound-frame .sound-range .ui-icon img');
  var im2 = document.querySelector('.bar .right .sound img');
  if (t.value == 0) {
    im.src=im2.src=a0 + 0 + a1;
  } else if (t.value > 0 && t.value <= 100 / 3) {
    im.src=im2.src=a0 + 1 + a1;
  } else if (t.value > 100 / 3 && t.value <= 200 / 3) {
    im.src=im2.src=a0 + 2 + a1;
  } else if (t.value > 200 / 3) {
    im.src=im2.src=a0 + 3 + a1;
  }
  document.querySelector('.sound-frame .sound-range .sound-data').innerText=parseInt(t.value);
}

// 为窗口添加事件
function refix(b) {
  // 实例化窗口信息
  var of = JSON.parse(b.getAttribute('data-offset'));
  b.style.top=of[0];
  b.style.left=of[1];
  b.style.width=of[2];
  b.style.height=of[3];
  // 窗口大小改变
  b.querySelector('.window-drags-top').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
    function fna(e) {
      ny = e.pageY;
      ny = ny - y;
      if (ny < 0) {
        if (!(0 - ny > dy)) {
          b.style.top=(dy + ny) + 'px',
          b.style.height=(by - ny) + 'px'
        }
      } else if (ny > 0) {
        if (!(ny > by - 34)) {
          b.style.top=(dy + ny) + 'px',
          b.style.height=(by - ny) + 'px'
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-left').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
    function fna(e) {
      nx = e.pageX;
      nx = nx - x;
      if (nx < 0) {
        if (!(nx > dx)) {
          b.style.left=(dx + nx) + 'px';
          b.style.width=(bx - nx) + 'px';
        }
      } else if (nx > 0) {
        if (bx - nx >= 300) {
          b.style.left=(dx + nx) + 'px';
          b.style.width=(bx - nx) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-right').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var x = e.pageX, nx, dx = window.innerWidth - b.getBoundingClientRect().left - b.getBoundingClientRect().width, bx = b.getBoundingClientRect().width;
    function fna(e) {
      nx = e.pageX;
      nx = nx - x;
      if (nx < 0) {
        if (bx + nx >= 300) {
          b.style.width=(bx + nx) + 'px';
        }
      } else if (nx > 0) {
        if (!(nx > dx)) {
          b.style.width=(bx + nx) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-bottom').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = window.innerHeight - 45 - b.getBoundingClientRect().top - b.getBoundingClientRect().height, by = b.getBoundingClientRect().height;
    function fna(e) {
      ny = e.pageY;
      ny = ny - y;
      if (ny < 0) {
        if (by - 34 + ny > 0) {
          b.style.height=(by + ny) + 'px';
        }
      } else if (ny > 0) {
        if (!(ny > dy)) {
          b.style.height=(by + ny) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-top-left').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
    var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
    function fna(e) {
      ny = e.pageY;
      ny = ny - y;
      if (ny < 0) {
        if (!(0 - ny > dy)) {
          b.style.top=(dy + ny) + 'px';
          b.style.height=(by - ny) + 'px';
        }
      } else if (ny > 0) {
        if (!(ny > by - 34)) {
          b.style.top=(dy + ny) + 'px';
          b.style.height=(by - ny) + 'px';
        }
      }
      nx = e.pageX;
      nx = nx - x;
      if (nx < 0) {
        if (!(nx > dx)) {
          b.style.left=(dx + nx) + 'px';
          b.style.width=(bx - nx) + 'px';
        }
      } else if (nx > 0) {
        if (bx - nx >= 300) {
          b.style.left=(dx + nx) + 'px';
          b.style.width=(bx - nx) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-top-right').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
    var x = e.pageX, nx, dx = window.innerWidth - b.getBoundingClientRect().left - b.getBoundingClientRect().width, bx = b.getBoundingClientRect().width;
    function fna(e) {
      ny = e.pageY;
      ny = ny - y;
      if (ny < 0) {
        if (!(0 - ny > dy)) {
          b.style.top=(dy + ny) + 'px';
          b.style.height=(by - ny) + 'px';
        }
      } else if (ny > 0) {
        if (!(ny > by - 34)) {
          b.style.top=(dy + ny) + 'px';
          b.style.height=(by - ny) + 'px';
        }
      }
      nx = e.pageX;
      nx = nx - x;
      if (nx < 0) {
        if (bx + nx >= 300) {
          b.style.width=(bx + nx) + 'px';
        }
      } else if (nx > 0) {
        if (!(nx > dx)) {
          b.style.width=(bx + nx) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-bottom-left').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = window.innerHeight - 45 - b.getBoundingClientRect().top - b.getBoundingClientRect().height, by = b.getBoundingClientRect().height;
    var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
    function fna(e) {
      ny = e.pageY;
      ny = ny - y;
      if (ny < 0) {
        if (by - 34 + ny > 0) {
          b.style.height=(by + ny) + 'px';
        }
      } else if (ny > 0) {
        if (!(ny > dy)) {
          b.style.height=(by + ny) + 'px';
        }
      }
      nx = e.pageX;
      nx = nx - x;
      if (nx < 0) {
        if (!(nx > dx)) {
          b.style.left=(dx + nx) + 'px';
          b.style.width=(bx - nx) + 'px';
        }
      } else if (nx > 0) {
        if (bx - nx >= 300) {
          b.style.left=(dx + nx) + 'px';
          b.style.width=(bx - nx) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  b.querySelector('.window-drags-bottom-right').onmousedown=function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = window.innerHeight - 45 - b.getBoundingClientRect().top - b.getBoundingClientRect().height, by = b.getBoundingClientRect().height;
    var x = e.pageX, nx, dx = window.innerWidth - b.getBoundingClientRect().left - b.getBoundingClientRect().width, bx = b.getBoundingClientRect().width;
    function fna(e) {
      ny = e.pageY;
      ny = ny - y;
      if (ny < 0) {
        if (by - 34 + ny > 0) {
          b.style.height=(by + ny) + 'px';
        }
      } else if (ny > 0) {
        if (!(ny > dy)) {
          b.style.height=(by + ny) + 'px';
        }
      }
      nx = e.pageX;
      nx = nx - x;
      if (nx < 0) {
        if (bx + nx >= 300) {
          b.style.width=(bx + nx) + 'px';
        }
      } else if (nx > 0) {
        if (!(nx > dx)) {
          b.style.width=(bx + nx) + 'px';
        }
      }
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  };
  $(b).find('.window-title').mousedown(function (e) {
    document.querySelectorAll('.window-quickframe').forEach(function(f){
      f.style.display="block";
    })
    var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
    var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
    function fna(e) {
      if (b.getAttribute('data-maxing') == '1') {
        b.querySelector('.window-czbtns .window-def-size').click();
      }

      ny = e.pageY;
      ny = ny - y;
      nx = e.pageX;
      nx = nx - x;
      b.style.top=(dy + ny) + 'px';
      b.style.left=(dx + nx) + 'px';
      var nof = b.getBoundingClientRect();
      b.setAttribute('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
    }
    function fnb(e) {
      document.removeEventListener('mousemove', fna);
      document.removeEventListener('mouseup', fnb);
      document.querySelectorAll('.window-quickframe').forEach(function(f){
        f.style.display="none";
      })
    }
    document.addEventListener('mousemove', fna);
    document.addEventListener('mouseup', fnb);
  })
  // 窗口大小改变 END

  // 窗口最大化
  function togglemax() {
    b.style.transition='all .2s';
    setTimeout(function () {
      b.style.transition='none';
    }, 200);
    if (b.getAttribute('data-maxing') == '1') {
      var of = JSON.parse(b.getAttribute('data-offset'));
      b.style.top=of[0];
      b.style.left=of[1];
      b.style.width=of[2];
      b.style.height=of[3];
      b.setAttribute('data-maxing', '0')
      this.classList.remove('window-def-size');
      this.classList.add('window-max-size');
      b.querySelector('.window-drags').style.display="block";
    } else {
      b.style.top='0';
      b.style.left='0';
      b.style.width='calc(100% - 2px)';
      b.style.height='calc(100% - 47px)';
      b.setAttribute('data-maxing', '1')
      this.classList.add('window-def-size');
      this.classList.remove('window-max-size');
      b.querySelector('.window-drags').style.display="none";
    }
  }
  try { b.querySelector('.window-czbtns .window-max-size').onclick = togglemax; } catch (err) { }

  // 窗口Focus至最前
  var _d = true;
  b.onmousedown=function () {
    _d = false;
    setFocus(b);
  };
  b.onclick=function () {
    if (_d) {
      setFocus(b);
    } else {
      _d = true;
    }
  };
  // 关闭窗口
  b.querySelector('.window-czbtns .window-close').onclick = function () {
    for (var i = 0; i < POPUPS.length; i++) {
      if (POPUPS[i].id == b.getAttribute('data-id')) {
        POPUPS.splice(i, 1);
      }
    }
    b.remove();
    fixBar()
  }
  // 最小化
  b.querySelector('.window-czbtns .window-min-size').onclick = function () {
    setFocus(b);
    var index;
    for (var i = 0; i < POPUPS.length; i++) {
      if (b.getAttribute('data-id') == POPUPS[i].id) {
        index = i;
        break;
      }
    }
    document.querySelector('.bar .left .mini-icon[data-index="' + index + '"]').click();
  }
}
// 窗口置顶函数
function setFocus(b) {
  if (parseInt(window.getComputedStyle(b).zIndex) >= ZINDEX) return;
  ZINDEX++;
  b.style.zIndex=ZINDEX.toString();
}
// 渲染底栏图标
function fixBar() {
  document.querySelectorAll('.bar .left .mini-icon.q').forEach(function(e){
    e.remove();
  })
  document.querySelectorAll('.bar .left .mini-icon').forEach(function(e){
    e.classList.remove('active');
    e.classList.remove('start');
  });
  var POPUPobj = {};
  for (var i = 0; i < POPUPS.length; i++) {
    if (POPUPobj[POPUPS[i].icon] == undefined) {
      POPUPobj[POPUPS[i].icon] = [i];
    } else {
      POPUPobj[POPUPS[i].icon].push(i);
    }
  }
  for (var k in POPUPobj) {
    var _a = true;
    for (var i2 = 0; i2 < document.querySelectorAll('.bar .left .mini-icon').length; i2++) {
      if (k == document.querySelectorAll('.bar .left .mini-icon')[i2].querySelector('img').src) {
        _a = false;
        document.querySelectorAll('.bar .left .mini-icon')[i2].classList.add('start');
        if (POPUPS[POPUPobj[k][0]].active) {
          document.querySelectorAll('.bar .left .mini-icon')[i2].classList.add('active');
        }
        document.querySelectorAll('.bar .left .mini-icon')[i2].setAttribute('data-index', POPUPobj[k][0]);
        if (POPUPobj[k].length != 1) {
          for (var i = 1; i < POPUPobj[k].length; i++) {
            var ni = document.createElement('div');
            ni.classList.add('mini-ico');
            ni.classList.add('q');
            ni.classList.add('start');
            if (POPUPS[POPUPobj[k][POPUPobj[k].length - i]].active) {
              ni.classList.add('active');
            }
            ni.setAttribute('data-index', POPUPobj[k][POPUPobj[k].length - i]);
            ni.innerHTML = '<img src="' + k + '"/>';
            document.querySelector('.bar .left').insertBefore(ni, document.querySelectorAll('.bar .left .mini-icon')[i2].nextSibling);
          }
        }

        break;
      }
    }
    if (_a) {
      var ni = document.createElement('div');
      ni.classList.add('mini-ico');
      ni.classList.add('q');
      if (POPUPobj[k].length == 1) {
        ni.classList.add('start');
        if (POPUPS[POPUPobj[k][0]].active) {
          ni.classList.add('active');
        }
        ni.setAttribute('data-index', POPUPobj[k][0]);
        ni.innerHTML = '<img src="' + k + '"/>';
        document.querySelector('.bar .left').append(ni);
      } else {
        for (var i = 0; i < POPUPobj[k].length; i++) {
          var ni = document.createElement('div');
          ni.classList.add('mini-ico');
          ni.classList.add('q');
          ni.classList.add('start');
          if (POPUPS[POPUPobj[k][i]].active) {
            ni.classList.add('active');
          }
          ni.setAttribute('data-index', POPUPobj[k][i]);
          ni.innerHTML = '<img src="' + k + '"/>';
          document.querySelector('.bar .left').append(ni);
        }
      }
    }
  }
  document.querySelectorAll('.mini-ico').forEach(function (e) {
    e.classList.add('mini-icon');
    e.classList.remove('mini-ico');
  });
  document.querySelectorAll('.mini-icon').forEach(function (e) {
    e.onclick = function () {
      if (!e.classList.contains('s')) {
        var index = parseInt(this.getAttribute('data-index'));
        var ele=POPUPS[index].element
        var jq = $(ele);
        var _avr = true;
        if (parseInt(ele.style.zIndex) < ZINDEX) {
          setFocus(ele);
          _avr = false;
        };
        debugger;
        if (window.getComputedStyle(ele).display == 'block' && _avr) {
          jq.hide(200);
          this.classList.remove('active');
          POPUPS[index].active = false;
        } else if (window.getComputedStyle(ele).display == 'none') {
          jq.show(200);
          this.classList.add('active');
          POPUPS[index].active = true;
        }
      }
    };
  })
}
// Popup对象
var Popup = function (options) {
  this.icon = options.icon;
  this.title = options.title;
  this.offset = options.offset;
  this.url = options.url;
  this.automax = options.automax;
  this.id = (Math.random() * 10000000).toString();
  this.active = false;
  this.element = null;
  this.notMax = options.notMax;
}
Popup.prototype = {
  build: function () {
    var html = '<div class="window-drags"><div class="window-drags-top"></div><div class="window-drags-left"></div><div class="window-drags-bottom"></div><div class="window-drags-right"></div><div class="window-drags-top-left"></div><div class="window-drags-top-right"></div><div class="window-drags-bottom-left"></div><div class="window-drags-bottom-right"></div></div><div class="window-title-bar"><div class="window-icon"><img src="' + this.icon + '" alt=""></div><div class="window-title">' + this.title + '</div><div class="window-czbtns"><div class="window-min-size"></div>' + (this.notMax == true ? '' : '<div class="window-max-size"></div>') + '<div class="window-close"></div></div></div><div class="window-content"><iframe src="' + this.url + '" frameborder="0"></iframe></div><div class="window-quickframe"></div><div class="loading-frame"><img src="' + this.icon + '"/></div>';
    var newwindow = document.createElement('div');
    newwindow.classList.add('windows-open-window');
    newwindow.setAttribute('data-offset', JSON.stringify(this.offset));
    newwindow.setAttribute('data-id', this.id);
    newwindow.style.display = 'none';
    newwindow.innerHTML = html;
    this.element = newwindow;
    return this;
  },
  init: function () {
    if (this.element == null) {
      throw new Error('\n\tinit Popup对象时应先build()，或检查build是否出错')
    }
    document.body.append(this.element);
    refix(this.element);
    var _this = this;
    this.element.querySelector('iframe').onload = function () {
      _this.element.querySelector('.loading-frame').style.opacity='0';
      setTimeout(function () {
        _this.element.querySelector('.loading-frame').style.display="none";
      }, 300);
    }
    this.active = true;
    POPUPS.push(this);
    setFocus(this.element);
    if (this.automax) {
      this.element.querySelector('.window-czbtns .window-max-size').click();
    }
    fixBar();
    $(this.element).show(200);
    return this;
  },
  show: function () {
    if (!this.active) {
      setFocus(this.element);
      var index;
      for (var i = 0; i < POPUPS.length; i++) {
        if (this.id == POPUPS[i].id) {
          index = i;
          break;
        }
      }
      document.querySelector('.bar .left .mini-icon[data-index="' + index + '"]').click();
    } else {
      setFocus(this.element);
    }
    return this;
  },
  hide: function () {
    if (this.active == true) {
      this.element.querySelector('.window-czbtns .window-min-size').click();
    }
    return this;
  },
  tomax: function () {
    if (this.element.getAttribute('data-maxing') != '1') {
      this.element.querySelector('.window-czbtns .window-max-size').click();
    }
    return this;
  },
  todef: function () {
    if (this.element.getAttribute('data-maxing') == '1') {
      this.element.querySelector('.window-czbtns .window-def-size').click();
    }
    return this;
  },
  close: function () {
    this.element.querySelector('.window-czbtns .window-close').click();
  }
}
var POPUPS = [];
function lightframechange(t) {
  console.log(t);
  var l = 1 - t.value / 100;
  parent.document.querySelector('.pad-light').style.opacity = l;
}
document.querySelectorAll('.desk ul li').forEach(function(e){
  e.addEventListener('dblclick', function () {
    var options = JSON.parse(this.getAttribute('data-options'));
    for (var i = 0; i < POPUPS.length; i++) {
      if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
        POPUPS[i].show();
        return;
      }
    }
    var p = new Popup(options);
    p.build().init();
  })
})
document.querySelectorAll('.win-frame .applist ul li').forEach(function(e){
  e.onclick=function () {
    var options = JSON.parse(this.getAttribute('data-options'));
    for (var i = 0; i < POPUPS.length; i++) {
      if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
        POPUPS[i].show();
        xqwinframe();
        return;
      }
    }
    var p = new Popup(options);
    p.build().init();
    xqwinframe();
  }
})
// 通知对象
var Notice = function (a) {
  this.icon = a.icon
  this.title = a.title ? a.title : ''
  this.center = a.center
  this.onclick = a.onclick ? a.onclick : function () { }
  this.showTime = a.showTime ? a.showTime : -1;
}
Notice.prototype = {
  send: function () {
    var l = document.createElement('li');
    var id = Math.random().toString();
    l.setAttribute('data-hash', id);
    l.innerHTML = '<div class="top"><div class="ui-icon"><img src="' + this.icon + '" alt=""></div><div class="title">' + this.title + '</div><div class="close"><img src="../../img/icon/ui/close.png" alt=""></div></div><div class="center">' + this.center + '</div>';
    document.querySelector('.message-frame .message-list ul').append(l);
    var lc = document.querySelector('.message-frame .message-list ul li[data-hash="' + id + '"]').cloneNode(true);
    this.element = l;
    document.querySelector('.message-container ul').append(lc);
    this.nelement = lc;
    var _this = this;
    l.querySelector('.top .close').onclick=function () {
      _this.close(l.getAttribute('data-hash'));
    };
    lc.querySelector('.top .close').onclick=function () {
      _this.close(lc.getAttribute('data-hash'));
    }
    l.querySelector('.center').onclick=function () {
      _this.onclick(_this)
    };
    lc.querySelector('.center').onclick=function () {
      _this.onclick(_this)
    };
    if (this.showTime != -1) {
      setTimeout(function () {
        _this.close(id);
      }, this.showTime)
    }
    return this;
  },
  close: function (id) {
    var lc;
    if (id) {
      document.querySelector('.message-frame .message-list ul li[data-hash="' + id + '"]').remove();
      lc = document.querySelector('.message-container ul li[data-hash="' + id + '"]');
    } else {
      this.element.remove();
      lc = this.nelement;
    }
    lc.style.animation='message-li-out .3s';
    setTimeout(function () {
      lc.remove();
    }, 300)
    return this;
  }
}

//******deploy**
if (localStorage.version == undefined) {
  new Popup({
    url: '../apps/aboutme.html',
    title: '关于',
    icon: '../../img/icon/win/info.png',
    offset: ['calc(50% - 250px)', 'calc(50% - 200px)', '400px', '500px'],
    notMax: true
  }).build().init();
  localStorage.version = version;
} else if (localStorage.version != version) {
  new Notice({
    title: "系统更新",
    icon: "../../img/windows10_home.png",
    center: "我们有了新的更新！（v0.7.5）<br>双击了解详情",
    onclick: function (notice) {
      notice.close();
      new Popup({
        url: '../apps/updates.html',
        title: '系统更新',
        icon: '../../img/icon/win/info.png',
        offset: ['calc(50% - 250px)', 'calc(50% - 200px)', '400px', '500px'],
        notMax: true
      }).build().init();
    }
  }).send();
  localStorage.version = version;
}
//******deploy-end**
function xqwinframe() {
  if (_q['win']) {
    document.querySelector('.bar .left .win').click();
  }
}
document.querySelector('.bar .right .show-desk').onclick=function () {
  for (var i = 0; i < POPUPS.length; i++) {
    console.log(POPUPS[i].active);
    POPUPS[i].hide();
  }
};
function startSetting(v) {
  if (v.value) {
    document.querySelector('.win-check[data-change="startSetting"]').click();
    var options = { "icon": "../../img/icon/settings.png", "url": "../apps/setting/setting.html", "offset": ["20px", "20px", "700px", "560px"], "title": "设置", "automax": true };
    for (var i = 0; i < POPUPS.length; i++) {
      if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
        POPUPS[i].show();
        if (_q['message']) {
          document.querySelector('.bar .right .message').click();
        }
        return;
      }
    }
    new Popup(options).build().init();
    if (_q['message']) {
      document.querySelector('.bar .right .message').click();
    }
  }
}
!function () {
  var date = new Date();
  document.querySelector('.time-frame .calendar .a .d').innerText=date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
  var $tb = document.querySelector('.time-frame .calendar .b table tbody');
  var $tbinner = '<tr>';
  var ndlist = [31, isRen() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // 判断闰月
  function isRen() {
    var r = date.getFullYear();
    return r % 4 == 0 ? (r % 100 == 0 ? (r % 400 == 0 ? true : false) : true) : false;
  }
  var _sj = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  _sj = _sj == 0 ? 6 : _sj - 1;
  for (var i = 0; i < (ndlist[date.getMonth()] + _sj); i++) {
    if (i < _sj) {
      $tbinner += '<td class="other-day">' + (ndlist[date.getMonth() - 1 < 0 ? 11 : date.getMonth() - 1] - _sj + 1 + i) + '</td>'
    } else {
      $tbinner += '<td' + ((i + 1 - _sj) == date.getDate() ? ' class="today"' : '') + '>' + (i + 1 - _sj) + '</td>';
    }
    if ((i + 1) % 7 == 0) {
      $tbinner += '</tr><tr>'
    }
  }

  $tbinner += '</tr>'
  $tb.innerHTML+=$tbinner;
  var $tbrld = $tb.querySelectorAll("tr");
  var $tbrl = $tbrld[$tbrld.length-1]
  for (var i = 0; i < 7 - $tbrld.length; i++) {
    var dstd = document.createElement('td');
    dstd.classList.add('other-day');
    dstd.innerText = (i + 1).toString();
    $tbrl.append(dstd);
  }
  var $tbtd = $tb.querySelectorAll('td');
  $tbtd.forEach(function(f){
    f.onclick=function (e) {
      e.stopPropagation();
      $tbtd.forEach(function(f){f.classList.remove('active')});
      this.classList.add('active');
    };
  });
}();

// 右键菜单ID
var ContextMenuId = null;
// 被右键菜单的桌面图标
var contextmenuedApp = null;
document.querySelectorAll('.desk-icon').forEach(function (e) {
  e.addEventListener('contextmenu', function () {
    contextmenuedApp = JSON.parse(this.getAttribute('data-options'));
    ContextMenuId = 'desktop-icon';
  })
});
document.querySelector('.desk').addEventListener('contextmenu', function () {
  if (ContextMenuId == null) ContextMenuId = 'desktop';
})
// 通过ContextMenuId在全局确定显示的菜单
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  document.querySelectorAll(".contextmenu").forEach(function (e) {
    e.style.display = "none";
  })
  if (ContextMenuId == null) return false;
  var $menu = document.querySelector('.contextmenu[name="' + ContextMenuId + '"]');
  $menu.removeAttribute('style');
  $menu.style.display="block";
  var deskWidth = document.querySelector(".desk").getBoundingClientRect().width;
  var deskHeight = document.querySelector(".desk").getBoundingClientRect().height;
  var menuWidth = $menu.getBoundingClientRect().width;
  var menuHeight = $menu.getBoundingClientRect().height;
  var Iskright = e.pageX > deskWidth - menuWidth;
  var Iskbottom = e.pageY > deskHeight - menuHeight - 10;
  if (Iskright) {
    $menu.style.left=deskWidth - menuWidth + 'px';
  } else {
    $menu.style.left= e.pageX + 'px';
  };
  if (Iskbottom) {
    $menu.style.bottom=window.innerHeight - e.pageY + 'px';
  } else {
    $menu.style.top=e.pageY + 'px';
  }
  ContextMenuId = null;
  return false;
});
var __zmenu = false;
document.querySelectorAll('.contextmenu li.group-item').forEach(function (ele) {
  ele.onmouseenter = function () {
    document.querySelectorAll('.contextmenu').forEach(function (e) { e.style.display = "none" });
    // $(this).parents('.contextmenu').show();
    var parent = this.parentElement.parentElement;
    parent.style.display="block";
    var $menu = document.querySelector('.contextmenu[name="' + this.getAttribute('data-go') + '"]');
    $menu.removeAttribute('style');
    $menu.style.display = "block";
    var deskWidth = window.innerWidth;
    var deskHeight = window.innerHeight;
    var menuWidth = $menu.offsetWidth;
    var menuHeight = $menu.offsetHeight;
    var $pmenu = this;
    var pmenuWidth = $pmenu.offsetWidth;
    var pmenutop = $pmenu.getBoundingClientRect().top;
    var pmenuleft = $pmenu.getBoundingClientRect().left;
    if (deskWidth - pmenuleft - pmenuWidth < menuWidth) {
      $menu.style.left = pmenuleft - pmenuWidth - 6 + 'px';
    } else {
      $menu.style.left = pmenuleft + pmenuWidth + 2 + 'px';
    };
    if (deskHeight - pmenutop < menuHeight) {
      $menu.style.bottom = '0px';
    } else {
      $menu.style.top = pmenutop + 'px';
    }

    $menu.onmouseenter = function () {
      __zmenu = true;
    }
  };
  ele.onmouseleave = function () {
    var $menu = document.querySelector('.contextmenu[name="' + this.getAttribute('data-go') + '"]');
    if (__zmenu == false) {
      $menu.style.display='none';
    } else {
      __zmenu = false;
    }
  };
})
document.querySelectorAll('.contextmenu li.linkto-item').forEach(function(e){
  e.onclick=function () {
    window.open(this.getAttribute('data-go'));
  };
})
document.querySelectorAll('.contextmenu li.radio-item').forEach(function(e){
  var Qname = e.getAttribute('name');
  var Qauto = e.getAttribute('data-auto');
  if (Qauto == 'true') {
    document.querySelectorAll('.contextmenu li.radio-item[name="' + Qname + '"]').forEach(function(f){
      f.classList.remove('active');
    })
    e.classList.add('active');
  }
  e.onclick=function () {
    document.querySelectorAll('.contextmenu li.radio-item[name="' + Qname + '"]').forEach(function(f){
      f.classList.remove('active');
    })
    e.classList.add('active');
    if (typeof RadioClickFns[Qname] == 'function') {
      RadioClickFns[Qname](e.querySelector('.title').innerText);
    }
  }
});
document.querySelectorAll('.contextmenu li.check-item').forEach(function(e){
  var Qname = e.getAttribute('name');
  var Qauto = e.getAttribute('data-auto');
  if (Qauto == 'true') {
    e.classList.add('active');
  }
  e.onclick=function () {
    var _a = true;
    if (this.classList.contains('active')) {
      e.classList.remove('active');
      _a = false;
    } else {
      e.classList.add('active');
    }
    if (typeof CheckClickFns[Qname] == 'function') {
      CheckClickFns[Qname](_a);
    }
  }
})
var IsDeskShow = true;
document.querySelector('.contextmenu li[name="reload-deskicon"]').onclick=function () {
  if (IsDeskShow) {
    document.querySelectorAll('.desk-icon').forEach(function(e){
      e.style.display="none";
    });
    setTimeout(function () {
      document.querySelectorAll('.desk-icon').forEach(function(e){
        e.style.display="block";
      });
    }, 100)
  }
}
document.querySelector('.contextmenu li[name="start-about"]').onclick=function () {
  new Popup({
    url: '../apps/aboutme.html',
    title: '关于',
    icon: '../../img/icon/win/info.png',
    offset: ['calc(50% - 250px)', 'calc(50% - 200px)', '400px', '500px'],
    notMax: true
  }).build().init();
};
var RadioClickFns = {
  "dlook-radio": function (id) {
    document.querySelector('.desk').classList.remove('smallicon');
    document.querySelector('.desk').classList.remove('bigicon');
    if (id == "大图标") {
      document.querySelector('.desk').classList.add('bigicon')
    } else if (id == "小图标") {
      document.querySelector('.desk').classList.add('smallicon')
    }
  }
};
var CheckClickFns = {
  'dicon-display': function (id) {
    if (id) {
      IsDeskShow = true;
      document.querySelectorAll('.desk-icon').forEach(function(e){
        e.style.display="block";
      });
    } else {
      IsDeskShow = false;
      document.querySelectorAll('.desk-icon').forEach(function(e){
        e.style.display="none";
      });
    }
  }
}
document.querySelector('.contextmenu li[name="start-this-app"]').onclick=function () {
  var options = contextmenuedApp;
  for (var i = 0; i < POPUPS.length; i++) {
    if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
      POPUPS[i].show();
      return;
    }
  }
  var p = new Popup(options);
  p.build().init();
};
window.onoffline=function(){
  new Notice({
    title: "网络错误",
    icon: "../../img/windows10_home.png",
    center: "你似乎已经断网，请尽快联网！",
    showTime:6000,
    onclick: function (notice) {
      notice.close();
    }
  }).send();
}
window.ononline=function(){
  new Notice({
    title: "已连上网络",
    icon: "../../img/windows10_home.png",
    center: "网络已成功连上！",
    showTime:2000,
    onclick: function (notice) {
      notice.close();
    }
  }).send();
}