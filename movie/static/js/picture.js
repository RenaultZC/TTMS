window.onload = function () {
    play(100);
    var CSS = document.getElementById("css");
    function play(num) {
        var UL = document.querySelector(".pic ul");
        var CSS = document.getElementById("css");
        var width = 800/num;
        var uHtml = '',pHtml = '',z = 0,zHtml = '',tHtml = '';
        for(var i = 0;i < num;i++){
            if(i>num/2){
                z--;
                zHtml += ".pic ul li:nth-child("+(i+1)+"){z-index:"+z+"}";
            }
            uHtml += "<li><div></div><div></div><div></div><div></div></li>";
            pHtml +=".pic ul li:nth-child("+(i+1)+") div{background-position:"+-width*i+"px}";
            tHtml +=".pic ul li:nth-child("+(i+1)+"){transition:1s "+0.005*i+"s}";
        }
        UL.innerHTML = uHtml;
        CSS.innerHTML += tHtml+ zHtml + pHtml + ".pic ul li,.pic ul li div{width:"+width+"px}";
    }
    var tabLi = document.querySelectorAll(".tab ul li");
    Array.prototype.forEach.call(tabLi,function (tab,index) {
        tab.onclick = function () {
            for(var i = 0;i < tabLi.length;i++){
                tabLi[i].className = "";
            }
            this.className = "on";
            CSS.innerHTML += ".pic ul li{transform:translateZ(-180px) rotateX("+index*(-90)+"deg)}"
        }
    });
    var pic = document.querySelector("#wrap .pic");
    var auto = null;
        pic.onmouseover = function () {
            clearInterval(auto);
        };
        pic.onmouseout = AutoPlay;
        function AutoPlay() {
            auto = setInterval(function () {
                for(var i = 0;i < tabLi.length;i++){
                    if(tabLi[i].className == "on"){
                        tabLi[i].className = "";
                        break;
                    }
                }
                tabLi[(i+1)%4].className = "on";
                CSS.innerHTML += ".pic ul li{transform:translateZ(-180px) rotateX("+(i+1)%4*(-90)+"deg)}"
            },2000);
        }
        AutoPlay();
};