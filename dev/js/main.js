$(document).ready(function () {
    svg4everybody({});
});

// document.addEventListener("click", function (event) {
//     alert(event.target.className+' '+event.currentTarget.toString());
// }, false);


// var p = document.getElementsByClassName("wrapper");
// p[0].addEventListener("click", function (event) {
//     //alert(event.target.className+' отловил '+event.currentTarget.toString());
//     var elemHeader = event.target.childNodes[1];
//     var svgimg = elemHeader.childNodes[1];
//     alert('отловил '+ svgimg.className + svgimg.tagName);
//     svgimg.dispatchEvent(event);
//
// }, false);



// It's important to add an load event listener to the object,
// as it will load the svg doc asynchronously
var clickedTowerNumber = null;
var isClickWithinTower = false;
var svgDoc  = null;
var isMenuVisible = false;


var a = document.getElementById("svgimg");

a.addEventListener("load",function(){
    // get the inner DOM of alpha.svg
    svgDoc = a.contentDocument;
    //т.к. header перекрывает svg и не является ни родителем, ни потомком (не работает всплытие),
    // то события не доходят до объекта,
    // поэтому пробрасываем щелчок мышью вручную
    var headwrapper = document.getElementsByClassName("headwrap");
    headwrapper[0].addEventListener("click", function (event) {
        newClickEvent = new MouseEvent(event.type, event);
        svgDoc.dispatchEvent(newClickEvent);
    }, false);

    var menuTriangle = document.getElementsByClassName("triangle-menu__small-triangle-container");
    menuTriangle[0].addEventListener("click", function (event) {
        newClickEvent = new MouseEvent(event.type, event);
        svgDoc.dispatchEvent(newClickEvent);
    }, false);


    svgDoc.addEventListener("click", function () {
        //этот обработчик добавлен для отслеживания клика мыши в пределах SVG, но не в пределах контура башен
        //для того чтобы скрывать все всплывающие элементы
        if(clickedTowerNumber == null && isClickWithinTower == false)
        {

        }
        else if(clickedTowerNumber != null && isClickWithinTower == false)
        {
            svgDoc.getElementById("tower_fill"+clickedTowerNumber).style.visibility = "hidden";
            svgDoc.getElementById("tower_outline"+clickedTowerNumber).style.visibility = "hidden";
            svgDoc.getElementById("tower_circle"+clickedTowerNumber).style.visibility = "hidden";
            svgDoc.getElementById("tower_inner_circle"+clickedTowerNumber).style.visibility = "hidden";
            svgDoc.getElementById("tower_line"+clickedTowerNumber).style.visibility = "hidden";
            document.getElementById("tower_popup" + clickedTowerNumber).style.display = "none";
            clickedTowerNumber = null;
        }
        isClickWithinTower = false;
    }, false);

    for (i = 1; i <= 13; i++) {
        // get the inner element by id
        if(i == 6){
            continue;
        }
        var towerFill = svgDoc.getElementById("tower_fill"+i);
        // add behaviour


        towerFill.addEventListener("click", function (event) {
            //определяем номер башни
            if(isMenuVisible == true){
                return;
            }
            var beforeLastChar = this.id.substr(-2, 1);
            if (!isNaN(beforeLastChar)) {
                // число
                var thisClickedTowerNumber  = this.id.substr(-2, 2);
                var towerCircle             = svgDoc.getElementById("tower_circle" + thisClickedTowerNumber);
                var towerInnerCircle        = svgDoc.getElementById("tower_inner_circle" + thisClickedTowerNumber);
                var towerLine               = svgDoc.getElementById("tower_line" + thisClickedTowerNumber);
                var towerPopup              = document.getElementById("tower_popup" + thisClickedTowerNumber);

            } else {
                // буква
                var thisClickedTowerNumber  = this.id.substr(-1, 1);
                var towerCircle             = svgDoc.getElementById("tower_circle" + thisClickedTowerNumber);
                var towerInnerCircle        = svgDoc.getElementById("tower_inner_circle" + thisClickedTowerNumber);
                var towerLine               = svgDoc.getElementById("tower_line" + thisClickedTowerNumber);
                var towerPopup              = document.getElementById("tower_popup" + thisClickedTowerNumber);
            }

            //если на экране уже отображается информация о другой башне
            if (clickedTowerNumber != null){
                //если щелчок произошел в пределах башни, информация о которой сейчас на экране
                if(clickedTowerNumber == thisClickedTowerNumber){
                    if (towerCircle.style.visibility == "visible") {
                        towerCircle.style.visibility = "hidden";
                        towerInnerCircle.style.visibility = "hidden";
                        towerLine.style.visibility = "hidden";
                        towerPopup.style.display = "none";
                        clickedTowerNumber = null;
                    }
                    else {
                        towerCircle.style.visibility = "visible";
                        towerInnerCircle.style.visibility = "visible";
                        towerLine.style.visibility = "visible";
                        towerPopup.style.display = "block";
                        isClickWithinTower = true;
                    }
                }
                //нужно скрыть ту башню, которая отображается, и отобразить заливку и контур той башни, над которой щелчок
                else{
                    svgDoc.getElementById("tower_outline" + clickedTowerNumber).style.visibility = "hidden";
                    svgDoc.getElementById("tower_fill" + clickedTowerNumber).style.visibility = "hidden";
                    svgDoc.getElementById("tower_circle" + clickedTowerNumber).style.visibility = "hidden";
                    svgDoc.getElementById("tower_inner_circle" + clickedTowerNumber).style.visibility = "hidden";
                    svgDoc.getElementById("tower_line" + clickedTowerNumber).style.visibility = "hidden";
                    document.getElementById("tower_popup" + thisClickedTowerNumber).style.display = "none";
                    //сделать видимым заливку и контур, как будто произошло событие mouseover
                    svgDoc.getElementById("tower_outline" + thisClickedTowerNumber).style.visibility = "visible";
                    svgDoc.getElementById("tower_fill" + thisClickedTowerNumber).style.visibility = "visible";
                }

            }
            //если на экране не отображено инфомрации ни об одной из башен
            else {
                if (towerCircle.style.visibility == "visible") {
                    towerCircle.style.visibility = "hidden";
                    towerInnerCircle.style.visibility = "hidden";
                    towerLine.style.visibility = "hidden";
                    towerPopup.style.display = "none";
                }
                else {
                    towerCircle.style.visibility = "visible";
                    towerInnerCircle.style.visibility = "visible";
                    towerLine.style.visibility = "visible";
                    towerPopup.style.display = "block";
                    isClickWithinTower = true;
                    clickedTowerNumber = thisClickedTowerNumber;
                }
            }

        }, false);


        towerFill.addEventListener("mouseover", function (event) {
            //alert('Прорисовка контура и заливки башни!');
            if(isMenuVisible == true){
                return;
            }
            var beforeLastChar = this.id.substr(-2, 1);
            if (!isNaN(beforeLastChar)) {
                // число
                var outlineTower = svgDoc.getElementById("tower_outline" + (this.id.substr(-2, 2)));
            } else {
                // буква
                var outlineTower = svgDoc.getElementById("tower_outline" + (this.id.substr(-1, 1)));
            }
            if (clickedTowerNumber != null) {

            }
            else {
                this.style.visibility = "visible";
                outlineTower.style.visibility = "visible";
            }
        }, false);


        towerFill.addEventListener("mouseout", function (event) {
            //alert('Пропадание контура и заливки башни!');


            var beforeLastChar = this.id.substr(-2, 1);
            if (!isNaN(beforeLastChar)) {
                // число
                var towerNumber = this.id.substr(-2, 2);
                var outlineTower = svgDoc.getElementById("tower_outline" + towerNumber);
            } else {
                // буква
                var towerNumber = this.id.substr(-1, 1);
                var outlineTower = svgDoc.getElementById("tower_outline" + towerNumber);
            }
            if (clickedTowerNumber == towerNumber) {

            }
            else {
                this.style.visibility = "hidden";
                outlineTower.style.visibility = "hidden";
            }
        }, false);
    }
}, false);

var triangleMenu = document.getElementsByClassName("triangle-menu");
var menuWhiteLine = document.getElementsByClassName("triangle-menu__white-line");
var menuReferense = document.getElementsByTagName("nav");

function MenuAnimation () {
    document.getElementsByClassName("triangle-menu")[0].style.width = "600px";
    document.getElementsByClassName("triangle-menu")[0].style.height = "900px";
    document.getElementsByClassName("triangle-menu__big-triangle-container")[0].style.left = 0;
    document.getElementsByClassName("triangle-menu__white-line-container")[0].style.left = 0;
    isMenuVisible = true;
    setTimeout(navBeforeTriangle,500);
};

function resizeMenu(){
    document.getElementsByClassName("triangle-menu")[0].style.width = "150px";
    document.getElementsByClassName("triangle-menu")[0].style.height = "250px";
}

function navBeforeTriangle() {
    var navMenu = triangleMenu[0].appendChild(menuReferense[0]);
    navMenu.style.position = "absolute";
    navMenu.style.zIndex = "5";
}

function MenuCloseAnimation() {
    document.getElementsByClassName("triangle-menu__big-triangle-container")[0].style.left = "-405px";
    document.getElementsByClassName("triangle-menu__white-line-container")[0].style.left = "-600px";
    var navMenu = menuWhiteLine[0].appendChild(menuReferense[0]);
    navMenu.style.position = "relative";
    navMenu.style.zIndex = "1";
    isMenuVisible = false;
    setTimeout(resizeMenu,500);
};

function checkAll(checkboxAll) {
    var checkboxes = document.getElementsByName('towers');
    if (checkboxAll.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = true;
            }
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            console.log(i)
            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = false;
            }
        }
    }
}