/**
 * Created by asforever on 2016/3/8.
 */


//�洢��IE6~7 cookie ���������HTML5���ش洢
document.getElementById("show2").onchange=function(){
    var arrDisplay =nicai1;
    console.log( arrDisplay)

    if (window.localStorage) {
        window.localStorage.setItem("menuTitle", arrDisplay);
    } else {
        Cookie.write("menuTitle", arrDisplay);
    }
}


