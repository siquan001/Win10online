var
    /* 当前版本 */
    version = "0.7.6",
    _a = _b = _c = _e =true,
    _q = {
        'win': false,
        'other-run': false,
        'battery': false,
        'wifi': false,
        'sound': false,
        'time': false,
        'message': false,
    },
    __winclickcache01,
    ZINDEX = 0;
function refreshdeskIcon() {
    $('.desk li.desk-icon').click(function () {
        $('.desk li.desk-icon').removeClass('active');
        $(this).addClass('active');
        _a = false;
    })
}
$('.bar .left .win').click(function () {
    quickframeListenerprot('win');
});
for (let k in _q) {
    if (k != 'win') {
        $('.bar .right .' + k).click(function () {
            console.log(k);
            quickframeListenerprot(k);
        });
    }
}
function quickframeListenerprot(t) {
    _b = false;
    clearTimeout(__winclickcache01);
    if (!_q[t]) {
        $('.quick-frame').css('animation', 'hide .2s');
        if (t == 'message') {
            $('.' + t + '-frame').css('animation', 'fright .3s');
        } else {
            $('.' + t + '-frame').css('animation', 'totop .3s');
        }
        $('.' + t + '-frame').show();
        __winclickcache01 = setTimeout(() => {
            $('.quick-frame').each(function () {
                if (!this.classList.contains(t + '-frame')) {
                    $(this).hide();
                }
            });
        }, 200);
        for (var key in _q) {
            _q[key] = false;
        }
        _q[t] = true;

    } else {
        $('.quick-frame').css('animation', 'hide .2s');
        $('.message-frame').css('animation', 'fhide .2s');
        __winclickcache01 = setTimeout(() => {
            $('.quick-frame').hide();
        }, 200);
        for (var key in _q) {
            _q[key] = false;
        }
    }
}
$('.quick-frame').each(function () {
    this.addEventListener('click', function () {
        _b = false;
    })
})
$(document).click(function () {
    if (_a) {
        $('.desk li.desk-icon').removeClass('active');
    } else {
        _a = true;
    };
    if (_b) {
        if ($('.message-frame').css('display') == 'block') {
            $('.message-frame').css('animation', 'fhide .2s');
        } else {
            $('.quick-frame').css('animation', 'hide .2s');
        }
        __winclickcache01 = setTimeout(() => {
            $('.quick-frame').hide();
        }, 200);
        for (var key in _q) {
            _q[key] = false;
        }
    } else {
        _b = true;
    };
    if (_c) {
        $('.darkthememenu>div').hide();
    } else {
        _c = true;
    };
    if(_e){
        $('.time-frame .calendar .b table tbody td').removeClass('active');
    }else{
        _e=true;
    }
    $('.contextmenu').hide();
})
refreshdeskIcon();


function updateTime() {
    $('.bar .right .time p.t').html(new Date().getHours() + ':' + check(new Date().getMinutes()) + ':' + check(new Date().getSeconds()));
    $('.bar .right .time p.d').html(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate());
    $('.time-frame .toptime .t').html(new Date().getHours() + ':' + check(new Date().getMinutes()) + ':' + check(new Date().getSeconds()));
    $('.time-frame .toptime .d').html(new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate()+'日');
    function check(a) {
        if (a < 10) {
            a = '0' + a;
        }
        return a;
    }
    setTimeout(function(){
        updateTime();
    },100)
}
updateTime();


var winframeTimeout;
$('.win-frame .left-bar').hover(function () {
    clearTimeout(winframeTimeout);
    winframeTimeout = setTimeout(function () {
        $('.win-frame .left-bar').css({
            'width': '200px',
            'box-shadow': '1px 0 5px #0008',
            'background-color': '#10101044',
            'backdrop-filter': 'blur(10px)'
        })
    }, 800)
}, function () {
    clearTimeout(winframeTimeout);
    $('.win-frame .left-bar').css({
        'width': '50px',
        'box-shadow': 'none',
        'background-color': 'transparent',
        'backdrop-filter': 'none'
    })
})

$('.win-frame .left-bar .start-item').click(function () {
    clearTimeout(winframeTimeout);
    if ($('.win-frame .left-bar').css('width') == '50px') {
        $('.win-frame .left-bar').css({
            'width': '200px',
            'box-shadow': '1px 0 5px #0008',
            'background-color': '#10101044',
            'backdrop-filter': 'blur(10px)'
        })
    } else {
        $('.win-frame .left-bar').css({
            'width': '50px',
            'box-shadow': 'none',
            'background-color': 'transparent',
            'backdrop-filter': 'none'
        })
    }

});


$('.win-frame .left-bar .power-item').click(function () {
    _c = false;
    $('.darkthememenu>.power-menu').toggle(300);
});
$('.win-frame .left-bar .setting-item').click(function () {
    var opc = { "icon": "../../img/icon/settings.png", "url": "../apps/setting.html", "offset": ["20px", "20px", "700px", "560px"], "title": "设置", "automax": true };
    new Popup(opc).build().init();
    xqwinframe();
});


$('.darkthememenu>.power-menu .sleep-item').click(function () {
    $('#sleep-ifr').show();
    $('#sleep-ifr').attr('src', 'user.html?mode=sleep');
})
$('.darkthememenu>.power-menu .poweroff-item').click(function () {
    location.href = 'poweroff.html';
})
$('.darkthememenu>.power-menu .restart-item').click(function () {
    location.href = 'poweroff.html?mode=restart';
});

// WinCheck
document.querySelectorAll('.win-check').forEach(function (e) {
    e.addEventListener('click', function () {
        if (this.classList.contains('disable')) {
        } else if (this.classList.contains('checked')) {
            this.classList.remove('checked');
            var fnt = e.getAttribute('data-change');
            if (fnt) eval(fnt + '({value:false})');
        } else {
            this.classList.add('checked');
            var fnt = e.getAttribute('data-change');
            if (fnt) eval(fnt + '({value:true})');
        }
    })
});

// WinRange
document.querySelectorAll('.win-range').forEach(function (e) {
    var r1 = e.querySelector('span.r1');
    var r2 = e.querySelector('span.r2');
    var r3 = e.querySelector('span.r3');
    var min = parseInt(e.getAttribute('data-min'));
    min = isNaN(min) ? 0 : min;
    var max = parseInt(e.getAttribute('data-max'));
    max = isNaN(max) ? 100 : max;
    var v = parseInt(e.getAttribute('data-value'));
    v = isNaN(v) ? 100 : v;
    r2.style.width = 'calc((100% - 8px) * ' + (v - min) / (max - min) + ')';
    r3.style.left = 'calc((100% - 8px) * ' + (v - min) / (max - min) + ')';
    r1.addEventListener('click', function (event) {
        var alw = r1.getBoundingClientRect().width;
        var clickw = event.offsetX - 4;
        clickw = clickw < 0 ? 0 : clickw > alw ? 100 : clickw;
        var percent = clickw / alw;
        r2.style.width = 'calc((100% - 8px) * ' + percent + ')';
        r3.style.left = 'calc((100% - 8px) * ' + percent + ')';
        e.setAttribute('data-value', (max - min) * percent + min);
        var fnt = e.getAttribute('data-change');
        if (fnt) eval(fnt + '({min:' + min + ',max:' + max + ',value:' + ((max - min) * percent + min) + '})')
    });
    r3.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var alw = r1.getBoundingClientRect().width;
        var nx;
        var l = r1.getBoundingClientRect().left;
        document.onmousemove = function (event) {
            nx = event.pageX - l;
            nx = nx < 0 ? 0 : nx > alw ? alw : nx;
            var percent = nx / alw;
            r2.style.width = 'calc((100% - 8px) * ' + percent + ')';
            r3.style.left = 'calc((100% - 8px) * ' + percent + ')';
            e.setAttribute('data-value', (max - min) * percent + min);
            event.preventDefault();
            var fnt = e.getAttribute('data-change');
            if (fnt) {
                eval(fnt + '({min:' + min + ',max:' + max + ',value:' + ((max - min) * percent + min) + '})');
            }
        }
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
    var im = $('.sound-frame .sound-range .ui-icon img').add('.bar .right .sound img');
    if (t.value == 0) {
        im.attr('src', a0 + 0 + a1);
    } else if (t.value > 0 && t.value <= 100 / 3) {
        im.attr('src', a0 + 1 + a1);
    } else if (t.value > 100 / 3 && t.value <= 200 / 3) {
        im.attr('src', a0 + 2 + a1);
    } else if (t.value > 200 / 3) {
        im.attr('src', a0 + 3 + a1);
    }
    $('.sound-frame .sound-range .sound-data').text(parseInt(t.value));
}

// 为窗口添加事件
function refix(b) {
    // 实例化窗口信息
    var of = JSON.parse($(b).attr('data-offset'));
    $(b).css({
        'top': of[0],
        'left': of[1],
        'width': of[2],
        'height': of[3]
    });
    // 窗口大小改变
    $(b).find('.window-drags-top').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
        function fna(e) {
            ny = e.pageY;
            ny = ny - y;
            if (ny < 0) {
                if (!(0 - ny > dy)) {
                    $(b).css({
                        'top': (dy + ny) + 'px',
                        'height': (by - ny) + 'px'
                    })
                }
            } else if (ny > 0) {
                if (!(ny > by - 34)) {
                    $(b).css({
                        'top': (dy + ny) + 'px',
                        'height': (by - ny) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    });
    $(b).find('.window-drags-left').mousedown(function (e) {
        $('.window-quickframe').show();
        var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
        function fna(e) {
            nx = e.pageX;
            nx = nx - x;
            if (nx < 0) {
                if (!(nx > dx)) {
                    $(b).css({
                        'left': (dx + nx) + 'px',
                        'width': (bx - nx) + 'px'
                    })
                }
            } else if (nx > 0) {
                if (bx - nx >= 300) {
                    $(b).css({
                        'left': (dx + nx) + 'px',
                        'width': (bx - nx) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-drags-right').mousedown(function (e) {
        $('.window-quickframe').show();
        var x = e.pageX, nx, dx = $(window).width() - $(b).offset().left - $(b).width(), bx = b.getBoundingClientRect().width;
        function fna(e) {
            nx = e.pageX;
            nx = nx - x;
            if (nx < 0) {
                if (bx + nx >= 300) {
                    $(b).css({
                        'width': (bx + nx) + 'px'
                    })
                }
            } else if (nx > 0) {
                if (!(nx > dx)) {
                    $(b).css({
                        'width': (bx + nx) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-drags-bottom').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = $(window).height() - 45 - $(b).offset().top - $(b).height(), by = b.getBoundingClientRect().height;
        function fna(e) {
            ny = e.pageY;
            ny = ny - y;
            if (ny < 0) {
                if (by - 34 + ny > 0) {
                    $(b).css({
                        'height': (by + ny) + 'px'
                    })
                }
            } else if (ny > 0) {
                if (!(ny > dy)) {
                    $(b).css({
                        'height': (by + ny) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-drags-top-left').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
        var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
        function fna(e) {
            ny = e.pageY;
            ny = ny - y;
            if (ny < 0) {
                if (!(0 - ny > dy)) {
                    $(b).css({
                        'top': (dy + ny) + 'px',
                        'height': (by - ny) + 'px'
                    })
                }
            } else if (ny > 0) {
                if (!(ny > by - 34)) {
                    $(b).css({
                        'top': (dy + ny) + 'px',
                        'height': (by - ny) + 'px'
                    })
                }
            }
            nx = e.pageX;
            nx = nx - x;
            if (nx < 0) {
                if (!(nx > dx)) {
                    $(b).css({
                        'left': (dx + nx) + 'px',
                        'width': (bx - nx) + 'px'
                    })
                }
            } else if (nx > 0) {
                if (bx - nx >= 300) {
                    $(b).css({
                        'left': (dx + nx) + 'px',
                        'width': (bx - nx) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-drags-top-right').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
        var x = e.pageX, nx, dx = $(window).width() - $(b).offset().left - $(b).width(), bx = b.getBoundingClientRect().width;
        function fna(e) {
            ny = e.pageY;
            ny = ny - y;
            if (ny < 0) {
                if (!(0 - ny > dy)) {
                    $(b).css({
                        'top': (dy + ny) + 'px',
                        'height': (by - ny) + 'px'
                    })
                }
            } else if (ny > 0) {
                if (!(ny > by - 34)) {
                    $(b).css({
                        'top': (dy + ny) + 'px',
                        'height': (by - ny) + 'px'
                    })
                }
            }
            nx = e.pageX;
            nx = nx - x;
            if (nx < 0) {
                if (bx + nx >= 300) {
                    $(b).css({
                        'width': (bx + nx) + 'px'
                    })
                }
            } else if (nx > 0) {
                if (!(nx > dx)) {
                    $(b).css({
                        'width': (bx + nx) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-drags-bottom-left').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = $(window).height() - 45 - $(b).offset().top - $(b).height(), by = b.getBoundingClientRect().height;
        var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
        function fna(e) {
            ny = e.pageY;
            ny = ny - y;
            if (ny < 0) {
                if (by - 34 + ny > 0) {
                    $(b).css({
                        'height': (by + ny) + 'px'
                    })
                }
            } else if (ny > 0) {
                if (!(ny > dy)) {
                    $(b).css({
                        'height': (by + ny) + 'px'
                    })
                }
            }
            nx = e.pageX;
            nx = nx - x;
            if (nx < 0) {
                if (!(nx > dx)) {
                    $(b).css({
                        'left': (dx + nx) + 'px',
                        'width': (bx - nx) + 'px'
                    })
                }
            } else if (nx > 0) {
                if (bx - nx >= 300) {
                    $(b).css({
                        'left': (dx + nx) + 'px',
                        'width': (bx - nx) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-drags-bottom-right').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = $(window).height() - 45 - $(b).offset().top - $(b).height(), by = b.getBoundingClientRect().height;
        var x = e.pageX, nx, dx = $(window).width() - $(b).offset().left - $(b).width(), bx = b.getBoundingClientRect().width;
        function fna(e) {
            ny = e.pageY;
            ny = ny - y;
            if (ny < 0) {
                if (by - 34 + ny > 0) {
                    $(b).css({
                        'height': (by + ny) + 'px'
                    })
                }
            } else if (ny > 0) {
                if (!(ny > dy)) {
                    $(b).css({
                        'height': (by + ny) + 'px'
                    })
                }
            }
            nx = e.pageX;
            nx = nx - x;
            if (nx < 0) {
                if (bx + nx >= 300) {
                    $(b).css({
                        'width': (bx + nx) + 'px'
                    })
                }
            } else if (nx > 0) {
                if (!(nx > dx)) {
                    $(b).css({
                        'width': (bx + nx) + 'px'
                    })
                }
            }
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    $(b).find('.window-title').mousedown(function (e) {
        $('.window-quickframe').show();
        var y = e.pageY, ny, dy = b.getBoundingClientRect().top, by = b.getBoundingClientRect().height;
        var x = e.pageX, nx, dx = b.getBoundingClientRect().left, bx = b.getBoundingClientRect().width;
        function fna(e) {
            if ($(b).attr('data-maxing') == '1') {
                $(b).find('.window-czbtns .window-def-size').click();
            }

            ny = e.pageY;
            ny = ny - y;
            nx = e.pageX;
            nx = nx - x;
            $(b).css({
                'top': (dy + ny) + 'px',
                'left': (dx + nx) + 'px',
            })
            var nof = b.getBoundingClientRect();
            $(b).attr('data-offset', JSON.stringify([nof.top + 'px', nof.left + 'px', (nof.width - 2) + 'px', (nof.height - 2) + 'px']))
        }
        function fnb(e) {
            document.removeEventListener('mousemove', fna);
            document.removeEventListener('mouseup', fnb);
            $('.window-quickframe').hide();
        }
        document.addEventListener('mousemove', fna);
        document.addEventListener('mouseup', fnb);
    })
    // 窗口大小改变 END

    // 窗口最大化
    function togglemax() {
        $(b).css('transition', 'all .2s');
        setTimeout(() => {
            $(b).css('transition', 'none');
        }, 200);
        if ($(b).attr('data-maxing') == '1') {
            var of = JSON.parse($(b).attr('data-offset'));
            $(b).css({
                'top': of[0],
                'left': of[1],
                'width': of[2],
                'height': of[3]
            });
            $(b).attr('data-maxing', '0')
            $(this).removeClass('window-def-size');
            $(this).addClass('window-max-size');
            $(b).find('.window-drags').show();
        } else {
            $(b).css({
                'top': '0',
                'left': '0',
                'width': 'calc(100% - 2px)',
                'height': 'calc(100% - 47px)'
            });

            $(b).attr('data-maxing', '1');
            $(this).addClass('window-def-size');
            $(this).removeClass('window-max-size');
            $(b).find('.window-drags').hide();
        }
    }
    try {$(b).find('.window-czbtns .window-max-size').get()[0].onclick = togglemax;} catch (err) {}
    
    // 窗口Focus至最前
    var _d = true;
    $(b).mousedown(function () {
        _d = false;
        setFocus(b);
    });
    $(b).click(function () {
        if (_d) {
            setFocus(b);
        } else {
            _d = true;
        }
    });
    // 关闭窗口
    $(b).find('.window-czbtns .window-close').get()[0].onclick = function () {
        for (var i = 0; i < POPUPS.length; i++) {
            if (POPUPS[i].id == $(b).attr('data-id')) {
                POPUPS.splice(i, 1);
            }
        }
        $(b).remove();
        fixBar()
    }
    // 最小化
    $(b).find('.window-czbtns .window-min-size').get()[0].onclick = function () {
        setFocus(b);
        var index;
        for (var i = 0; i < POPUPS.length; i++) {
            if ($(b).attr('data-id') == POPUPS[i].id) {
                index = i;
                break;
            }
        }
        $('.bar .left .mini-icon[data-index="' + index + '"]').click();
    }
}
// 窗口置顶函数
function setFocus(b) {
    ZINDEX++;
    $(b).css({
        'z-index': ZINDEX.toString()
    })
}
// 渲染底栏图标
function fixBar() {
    $('.bar .left .mini-icon.q').remove();
    $('.bar .left .mini-icon').removeClass('active');
    $('.bar .left .mini-icon').removeClass('start');
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
        for (var i2 = 0; i2 < $('.bar .left .mini-icon').length; i2++) {
            if (k == $('.bar .left .mini-icon').eq(i2).find('img').attr('src')) {
                _a = false;
                $('.bar .left .mini-icon')[i2].classList.add('start');
                if (POPUPS[POPUPobj[k][0]].active) {
                    $('.bar .left .mini-icon')[i2].classList.add('active');
                }
                $('.bar .left .mini-icon')[i2].setAttribute('data-index', POPUPobj[k][0]);
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
                        $('.bar .left').get()[0].insertBefore(ni, $('.bar .left .mini-icon')[i2].nextSibling);
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
                $('.bar .left').get()[0].append(ni);
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
                    $('.bar .left').get()[0].append(ni);
                }
            }
        }
    }
    $('.mini-ico').each(function () {
        $(this).addClass('mini-icon');
        $(this).removeClass('mini-ico');
    });
    $('.mini-icon').get().forEach(function (e) {
        e.onclick = function () {
            if (e.classList.contains('s')) {

            } else {
                var index = parseInt($(this).attr('data-index'));
                var jq = $(POPUPS[index].element);
                var _avr=true;
                if (parseInt(jq.css('z-index')) < ZINDEX) {
                    setFocus(jq.get()[0]);
                    _avr=false;
                };
                if (jq.css('display') == 'block'&&_avr) {
                    jq.hide(200);
                    $(this).removeClass('active');
                    POPUPS[index].active = false;
                } else if(jq.css('display') == 'none'){
                    jq.show(200);
                    $(this).addClass('active');
                    POPUPS[index].active = true;
                }
            }

        };
    })
}
// Popup对象
var Popup = function (options) {
    if (!options.icon || !options.title || !options.url || !options.offset) {
        throw new Error('\n\t创建Popup对象少不了这些属性：icon title url offset')
    };
    if (typeof options.icon != 'string') {
        throw new Error('\n\t创建Popup对象时icon属性错误：icon应为string');
    };
    if (typeof options.title != 'string') {
        throw new Error('\n\t创建Popup对象时title属性错误：title应为string');
    };
    if (typeof options.url != 'string') {
        throw new Error('\n\t创建Popup对象时url属性错误：url应为string');
    };
    if (!Array.isArray(options.offset) || (Array.isArray(options.offset) && options.offset.length != 4)) {
        throw new Error('\n\t创建Popup对象时offset属性错误：offset应为包含4个string的Array');
    };
    for (var i = 0; i < options.offset.length; i++) {
        if (typeof options.offset[i] != 'string') {
            throw new Error('\n\t创建Popup对象时offset属性错误：offset应为包含4个string的Array');
        }
    }
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
        var html = `
        <div class="window-drags">
            <div class="window-drags-top"></div>
            <div class="window-drags-left"></div>
            <div class="window-drags-bottom"></div>
            <div class="window-drags-right"></div>
            <div class="window-drags-top-left"></div>
            <div class="window-drags-top-right"></div>
            <div class="window-drags-bottom-left"></div>
            <div class="window-drags-bottom-right"></div>
        </div>
        <div class="window-title-bar">
            <div class="window-icon">
                <img src="${this.icon}" alt="">
            </div>
            <div class="window-title">${this.title}</div>
            <div class="window-czbtns">
                <div class="window-min-size"></div>
                ${this.notMax == true ? '' : '<div class="window-max-size"></div>'}
                <div class="window-close"></div>
            </div>
        </div>
        <div class="window-content">
            <iframe src="${this.url}" frameborder="0"></iframe>
        </div>
        <div class="window-quickframe"></div>
        <div class="loading-frame"><img src="${this.icon}"/></div>`;
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
        var _this=this;
        $(this.element).find('iframe').get()[0].onload=function(){
            $(_this.element).find('.loading-frame').css('opacity','0');
            setTimeout(() => {
                $(_this.element).find('.loading-frame').hide();
            }, 300);
        }
        console.log($(this.element).find('iframe').get()[0].onload)
        this.active = true;
        POPUPS.push(this);
        setFocus(this.element);
        if (this.automax) {
            $(this.element).find('.window-czbtns .window-max-size').click();
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
            $('.bar .left .mini-icon[data-index="' + index + '"]').click();
        } else {
            setFocus(this.element);
        }
        return this;
    },
    hide: function () {
        if(this.active==true){
            $(this.element).find('.window-czbtns .window-min-size').click();
        }
        return this;
    },
    tomax: function () {
        if ($(this.element).attr('data-maxing') != '1') {
            $(this.element).find('.window-czbtns .window-max-size').click();
        }
        return this;
    },
    todef: function () {
        if ($(this.element).attr('data-maxing') == '1') {
            $(this.element).find('.window-czbtns .window-def-size').click();
        }
        return this;
    },
    close: function () {
        $(this.element).find('.window-czbtns .window-close').click();
    }
}
var POPUPS = [];
function lightframechange(t) {
    console.log(t);
    var l = 1 - t.value / 100;
    parent.document.querySelector('.pad-light').style.opacity = l;
}
$('.desk ul li').on('dblclick', function () {
    var options = JSON.parse($(this).attr('data-options'));
    for (var i = 0; i < POPUPS.length; i++) {
        if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
            POPUPS[i].show();
            return;
        }
    }
    var p = new Popup(options);
    p.build().init();
})
$('.win-frame .applist ul li').click(function () {
    var options = JSON.parse($(this).attr('data-options'));
    var p = new Popup(options);
    for (var i = 0; i < POPUPS.length; i++) {
        if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
            POPUPS[i].show();
            xqwinframe();
            return;
        }
    }
    p.build().init();
    xqwinframe();
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
        l.innerHTML = `
        <div class="top">
            <div class="ui-icon">
                <img src="${this.icon}" alt="">
            </div>
            <div class="title">${this.title}</div>
            <div class="close">
                <img src="../../img/icon/ui/close.png" alt="">
            </div>
        </div>
        <div class="center">${this.center}</div>
        `
        $('.message-frame .message-list ul')[0].append(l);
        var lc = $('.message-frame .message-list ul li[data-hash="' + id + '"]')[0].cloneNode(true);
        this.element = l;
        $('.message-container ul')[0].append(lc);
        this.nelement = lc;
        var _this = this;
        $(l).find('.top .close').click(function () {
            _this.close($(this).parents('li').attr('data-hash'));
        });
        $(lc).find('.top .close').click(function () {
            _this.close($(this).parents('li').attr('data-hash'));
        })
        $(l).find('.center').click(function () {
            _this.onclick(_this)
        });
        $(lc).find('.center').click(function () {
            _this.onclick(_this)
        });
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
            $('.message-frame .message-list ul li[data-hash="' + id + '"]')[0].remove();
            lc = $('.message-container ul li[data-hash="' + id + '"]')[0];
        } else {
            this.element.remove();
            lc = this.nelement;
        }
        $(lc).css({
            'animation': 'message-li-out .3s'
        })
        setTimeout(function () {
            lc.remove();
        }, 300)
        return this;
    }
}
/* tests
var alls=new Notice({
    icon:"../../img/icon/cortana.png",
    title:"Cortana",
    center:"Hello, I'm Cortana!",
    showTime:3000
}).send();
*/
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
        $('.bar .left .win').click();
    }
}
$('.bar .right .show-desk').click(function () {
    for (var i = 0; i < POPUPS.length; i++) {
        POPUPS[i].hide();
    }
})
function startSetting(v) {
    if (v.value) {
        $('.win-check[data-change="startSetting"]').click();
        var options = { "icon": "../../img/icon/settings.png", "url": "../apps/setting.html", "offset": ["20px", "20px", "700px", "560px"], "title": "设置", "automax": true };
        for (var i = 0; i < POPUPS.length; i++) {
            if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
                POPUPS[i].show();
                if (_q['message']) {
                    $('.bar .right .message').click();
                }
                return;
            }
        }
        new Popup(options).build().init();
        if (_q['message']) {
            $('.bar .right .message').click();
        }
    }
}
!function(){
$('.time-frame .calendar .a .d').text(new Date().getFullYear()+'年'+(new Date().getMonth()+1)+'月');
var $tb=$('.time-frame .calendar .b table tbody');
var $tbinner='<tr>';
var date=new Date();
var ndlist=[31,isRen()?29:28,31,30,31,30,31,31,30,31,30,31];
function isRen(){
    var r=new Date().getFullYear();
    return r%4==0?(r%100==0?(r%400==0?true:false):true):false;
}
var _sj=new Date(date.getFullYear(),date.getMonth(),1).getDay();
_sj=_sj==0?6:_sj-1;
for(var i=0;i<(ndlist[date.getMonth()]+_sj);i++){
    if(i<_sj){
        $tbinner+='<td class="other-day">'+(ndlist[date.getMonth()-1<0?11:date.getMonth()-1]-_sj+1+i)+'</td>'
    }else{
        $tbinner+='<td'+((i+1-_sj)==new Date().getDate()?' class="today"':'')+'>'+(i+1-_sj)+'</td>';
    }
    if((i+1)%7==0){
        $tbinner+='</tr><tr>'
    }
}

$tbinner+='</tr>'
$tb.html($tb.html()+$tbinner)

var $tbrl=$tb.find('tr:last');
var $tbrld=$tbrl.find('td');
for(var i=0;i<7-$tbrld.length;i++){
    var dstd=document.createElement('td');
    dstd.classList.add('other-day');
    dstd.innerText=(i+1).toString();
    $tbrl.append(dstd);
}
$tbtd=$tb.find('td');
$tbtd.click(function(){
    _e=false;
    $tbtd.removeClass('active');
    $(this).addClass('active');
})
}();
var ContextMenuId=null;
var contextmenuedApp=null;
$('.desk-icon').get().forEach(function(e){e.addEventListener('contextmenu',function(){
    contextmenuedApp=JSON.parse($(this).attr('data-options'));
    ContextMenuId='desktop-icon';
})});
$('.desk')[0].addEventListener('contextmenu',function(){
    if(ContextMenuId==null)ContextMenuId='desktop';
})
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
    $('.contextmenu').hide();
    if(ContextMenuId==null) return false;
    var $menu=$('.contextmenu[name="'+ContextMenuId+'"]');
    $menu.removeAttr('style');
    $menu.show();
    var deskWidth=$('.desk').width();
    var deskHeight=$('.desk').height();
    var menuWidth=$menu.width();
    var menuHeight=$menu.height();
    var Iskright=e.pageX>deskWidth-menuWidth;
    var Iskbottom=e.pageY>deskHeight-menuHeight-10;
    if(Iskright){
        $menu.css({
            'left':deskWidth-menuWidth+'px'
        })
    }else{
        $menu.css({
            'left':e.pageX+'px'
        })
    };
    if(Iskbottom){
        $menu.css({
            'bottom':window.innerHeight-e.pageY+'px'
        })
    }else{
        $menu.css({
            'top':e.pageY+'px'
        })
    }
    ContextMenuId=null;
    return false;
});
var __zmenu=false;
$('.contextmenu li.group-item').hover(function(){
    $('.contextmenu').hide();
    $(this).parents('.contextmenu').show();
    var $menu=$('.contextmenu[name="'+$(this).attr('data-go')+'"]');
    $menu.removeAttr('style');
    $menu.show();
    var deskWidth=$('.desk').width();
    var deskHeight=$('.desk').height();
    var menuWidth=$menu.width();
    var menuHeight=$menu.height();
    var $pmenu=$(this);
    var pmenuWidth=$pmenu.width();
    var pmenutop=$pmenu.offset().top;
    var pmenuleft=$pmenu.offset().left;
    if(deskWidth-pmenuleft-pmenuWidth<menuWidth){
        $menu.css({
            'left':pmenuleft-pmenuWidth-6+'px'
        });
    }else{
        $menu.css({
            'left':pmenuleft+pmenuWidth+2+'px'
        });
    };
    if(deskHeight-pmenutop<menuHeight){
        $menu.css({
            'bottom':'0px'
        });
    }else{
        $menu.css({
            'top':pmenutop+'px'
        });
    }
    
    $menu.hover(function(){
        __zmenu=true;
    },function(){

    })
},function(){
    var $menu=$('.contextmenu[name="'+$(this).attr('data-go')+'"]');
    if(__zmenu==false){
        $menu.hide();
    }else{
        __zmenu=false;
    }
})
var IsDeskShow=true;
$('.contextmenu li[name="reload-deskicon"]').click(function(){
    if(IsDeskShow){
        $('.desk-icon').hide();
        setTimeout(function(){
            $('.desk-icon').show();
        },100)
    }
})
$('.contextmenu li[name="start-about]"').click(function(){
    new Popup({
        url: '../apps/aboutme.html',
        title: '关于',
        icon: '../../img/icon/win/info.png',
        offset: ['calc(50% - 250px)', 'calc(50% - 200px)', '400px', '500px'],
        notMax: true
    }).build().init();
});
$('.contextmenu li.linkto-item').click(function(){
    window.open($(this).attr('data-go'));
});
var RadioClickFns={
    "dlook-radio":function(id){
        $('.desk').removeClass('smallicon');
        $('.desk').removeClass('bigicon');
        if(id=="大图标"){
            $('.desk').addClass('bigicon')
        }else if(id=="小图标"){
            $('.desk').addClass('smallicon')
        }
    }
};
$('.contextmenu li.radio-item').each(function(){
    var Qname=$(this).attr('name');
    var Qauto=$(this).attr('data-auto');
    if(Qauto=='true'){
        $('.contextmenu li.radio-item[name="'+Qname+'"]').removeClass('active');
        $(this).addClass('active');
    }
    $(this).click(function(){
        $('.contextmenu li.radio-item[name="'+Qname+'"]').removeClass('active');
        $(this).addClass('active');
        if(typeof RadioClickFns[Qname]=='function'){
            RadioClickFns[Qname]($(this).find('.title').text());
        }
    })
});
var CheckClickFns={
    'dicon-display':function(id){
        if(id){
            IsDeskShow=true;
            $('.desk-icon').show();
        }else{
            IsDeskShow=false;
            $('.desk-icon').hide();
        }
    }
}
$('.contextmenu li.check-item').each(function(){
    var Qname=$(this).attr('name');
    var Qauto=$(this).attr('data-auto');
    if(Qauto=='true'){
        $(this).addClass('active');
    }
    $(this).click(function(){
        var _a=true;
        if(this.classList.contains('active')){
            $(this).removeClass('active');
            _a=false;
        }else{
            $(this).addClass('active');
        }
        if(typeof CheckClickFns[Qname]=='function'){
            CheckClickFns[Qname](_a);
        }
    })
})
$('.contextmenu li[name="start-this-app"]').click(function(){
    var options = contextmenuedApp;
    for (var i = 0; i < POPUPS.length; i++) {
        if (POPUPS[i].icon == options.icon && POPUPS[i].title == options.title && POPUPS[i].url == options.url) {
            POPUPS[i].show();
            return;
        }
    }
    var p = new Popup(options);
    p.build().init();
})