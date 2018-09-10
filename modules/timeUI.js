zapper(
    {
        webapi: 'webapi.js',
    },
    function ($, module) {
        var dateMap =
            {
                '0': -1,
                '1': -15,
                '2': -29,
                '3': -43,
                '4': -59,
                '5': -75,
                '6': -91,
                '7': -107,
                '8': -123,
                '9': -139,
                '/': -155,
                ':': -171,
                '|': -187
            };
        var weekMap =
            {
                '0': "星期日",
                '1': "星期一",
                '2': "星期二",
                '3': "星期三",
                '4': "星期四",
                '5': "星期五",
                '6': "星期六",
            }
        var flagReq = false;//数据请求开关
        function addZero(num) {
            return num < 10 ? "0" + num : "" + num;
        }
        /**
         * 
         * @param {*} elem 可传入字符串(#id) DOM对象(elem) zapper对象
         * @param {*} dateFormate 日期格式 字符串
         * @param {*} run 是否动态刷新 布尔值
         */
        function time(elem, dateFormate, run) {//至少传入1个参数,其他值可为缺省值。
            if (!elem) { return; }
            var e = elem, f = "YYYY/MM/DD", r = false;
            if (e.targets) {
                e = e.targets[0];
            } else if (typeof e === "string") {
                e = document.getElementById(e.substring(1));
            }
            // if (typeof e === "string" || !e.targets) {
            //     e = $(e);
            // } else {
            //     e = e;
            // }
            if (typeof dateFormate === "boolean") {
                r = dateFormate;
            } else if (typeof dateFormate === "string") {
                f = dateFormate;
            }
            if (typeof run === "boolean") {
                r = run;
            }
            var ff = f;//格式副本
            function dateBlockerFormate(d) {//"YYYY/MM/DD"    "HH:MM:SS"
                if (f == "WW" || f == "ww") {
                    e.innerHTML = weekMap[d.getDay()];
                    // e.html(weekMap[d.getDay()]);
                    return;
                }
                f = f.replace("YYYY", d.getFullYear());
                f = f.replace("MM", addZero(d.getMonth() + 1));
                f = f.replace("DD", addZero(d.getDate()));
                f = f.replace("HH", addZero(d.getHours()));
                f = f.replace("mm", addZero(d.getMinutes()));
                f = f.replace("ss", addZero(d.getSeconds()));
                e.innerHTML = "";
                // e.html("");
                for (var i = 0; i < f.length; i++) {
                    var n = dateMap[f.charAt(i)];
                    var oDiv = document.createElement("div");
                    e.appendChild(oDiv);
                    oDiv.style.backgroundImage = n ? 'url(/lib/zapper/images/number/number.png)' : "";
                    oDiv.style.backgroundPosition = n ? n + 'px -1px' : "";
                    oDiv.style.width= '13px';
                    oDiv.style.height= '39px';
                    oDiv.style.display= 'inline-block';
                    // var oDiv = $.createElem('div');
                    // var $div = $(oDiv);
                    // $div.css({
                    //     backgroundImage: n ? 'url(/lib/zapper.v2/images/number/number.png)' : "",
                    //     backgroundPosition: n ? n + 'px -1px' : "",
                    //     width: '13px',
                    //     height: '39px',
                    //     display: 'inline-block'
                    // });
                    // e.append($div);
                }
                f = ff;
            }
            function init(date) {
                dateBlockerFormate(date);
                if (r) {
                    setInterval(function () {
                        date = new Date(date.getTime() + 1000);
                        dateBlockerFormate(date);
                    }, 1000);
                }
            }
            if (flagReq) {
                setTimeout(function () {
                    date = window.SystemDate;
                    init(date);
                }, 300);
            } else {
                flagReq = true;
                var webapi = module('webapi');
                webapi.apps('time', {}).done(function (data) {
                    var dateStrList = data.date.split(/[\s:-]/);
                    var date = new Date(dateStrList[0], dateStrList[1] - 1, dateStrList[2], dateStrList[3], dateStrList[4], dateStrList[5]);
                    window.SystemDate = date;
                    init(date);
                });
            }
        }
        return time;
    }
);
