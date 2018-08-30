zapper(
    function ($, module) {
        // 创建天气类
        function WeatherClass(P) {
            //    保存天气数据
            this.data = null;
            //保存容器节点
            this.dom = $(P.dom);
            //赋值对象数据方法
            this.init = function (data) {
                this.data = data;
            };
            //获取数据并加载 data:数据  count:需要加载的天气数量                
            this.load = function (data, start,end) {
                this.init(data);
                this.loadData(start,end);
            };

            // 创建天气dom satart/end:获取从开始时间到结束时间的天气,未传入end时，获取传入时间一天的天气
            //ex:0为当天天气,往后类推
            this.loadData = function (start,end) {

                if(end){
                    var M=this.data.slice(start,end);
                    
                }else{
                    var M=this.data.slice(start,start+1);
                   
                }             
                var frag = document.createDocumentFragment();//用来储存container的容器，最后加载至dom
                for (var i = 0; i <M.length; i++) {
                    if (!M[i]) return;
                    //创建元素在嘉定机顶盒使用$("<div>")会出现有元素未创建出来的问题，这里用了原生创建元素和样式的方法
                    var container = document.createElement("div");
                    var temperature = document.createElement("div");
                    var img = document.createElement("img");
                    container.style.width = 150 + "px";
                    container.style.height = 50 + "px";
                    container.style.position = "relative";
                    temperature.innerHTML = M[i].tempe;
                    temperature.style.height = 50 + "px";
                    temperature.style.width = 100 + "px";
                    temperature.style.lineHeight = 50 + "px";
                    temperature.style.textAlign = "center";
                    temperature.style.position = "absolute";
                    temperature.style.left = 50 + 'px';
                    img.src = "images/weather/" + M[i].pic;
                    img.style.position = "absolute";
                    img.style.left = 0;
                    img.style.width = 50 + "px";
                    img.style.height = 50 + "px";
                    img.style.display = 'block';
                    container.appendChild(img);
                    container.appendChild(temperature);
                    frag.appendChild(container);
                }
                this.dom.get(0).appendChild(frag);
            };
        }

        //导出方法  str:传入的字符串用于选择元素
        function weather(str) {
            var xhr = $.ajax({
                type: "get",
                dataType: "JSON",
                url: "webapi/apps/weather.php",
            });
            xhr.done(function (res) {
                var wModule = new WeatherClass({
                    dom: str
                });
                wModule.load(res.repData, 0);
            });
        }
        return weather;
    }
);