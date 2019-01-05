/**
 * Created by zhenglijiao on 2019/1/4.
 */
window.onload = function(){
//    获取dom元素
    var lisNodes = document.querySelectorAll('.nav li');
    var arrow = document.querySelector('.arrow');
    var liUp = document.querySelectorAll('.up');
    var content = document.querySelector('.content')
    var contentMain = document.querySelector('.contentMain');
    //定义变量
    var contentHeight = content.offsetHeight;
    var left = lisNodes[0].getBoundingClientRect().left+lisNodes[0].
            offsetWidth/2-arrow.offsetWidth/2+'px';
    //定义小箭头初始位置
    arrow.style.left = left;
    liUp[0].style.width = 100+'%';
    for(var i = 0;i<lisNodes.length;i++){
        lisNodes[i].index = i;
        var nowIndex = 0;
        lisNodes[i].onclick = function(){
            var nowIndex = this.index;
            move(nowIndex);
            }
        }
    function move(nowIndex){
        for(var j = 0;j<lisNodes.length;j++){
            liUp[j].style.width = '';
        }
        liUp[nowIndex].style.width = 100+'%';
        arrow.style.left = lisNodes[nowIndex].getBoundingClientRect().left+lisNodes[nowIndex].
                offsetWidth/2-arrow.offsetWidth/2+'px';
        contentMain.style.top = -contentHeight*nowIndex+'px';
    }
    var timer = '';
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll', wheel);

    function wheel(event) {
        event = event || window.event;
        clearTimeout(timer);
        timer = setTimeout(function(){
            var flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            }
            switch (flag) {
                case 'up' :
                    if(nowIndex<=0){
                    }else{
                        nowIndex--;
                    }
                    move(nowIndex);
                    break;
                case 'down' :
                    if(nowIndex>=lisNodes.length-1){
                    }else{
                        nowIndex++;
                    }
                    console.log(nowIndex);
                    move(nowIndex);
                    break;
            }

            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        },300)
    }
    //第一屏轮播
    banner();
    function banner(){
        var pointLisNodes = document.querySelectorAll('.home-point li');
        var carouselLisNodes = document.querySelectorAll('.home-carousel li');
        var nowIndex = 0;
        var lastIndex = 0;
        for (var i = 0; i < pointLisNodes.length; i++) {
            pointLisNodes[i].index = i;
            pointLisNodes[i].onclick = function () {
                nowIndex = this.index;
                if(nowIndex>lastIndex){
                    carouselLisNodes[lastIndex].className='font-title leftHide';
                    carouselLisNodes[nowIndex].className = 'font-title rightShow';
                }else if(nowIndex<lastIndex){
                    carouselLisNodes[lastIndex].className='font-title rightHide';
                    carouselLisNodes[nowIndex].className = 'font-title leftShow';
                }
                pointLisNodes[lastIndex].className = '';
                this.className = 'active';
                lastIndex = nowIndex ;
            }
        }
    }
}