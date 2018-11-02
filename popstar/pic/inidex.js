var table;//定义桌子
var squareNum = 10;//横坚有多少个星星
var squareWidth = 40;//每个星星的长和宽
var squareSet = [];//定义一个空数组，存星星
var choose = [];//定义一个空数组，存被选中的星星
var timer = null;//定义计时器
var key = true;//加锁

function refresh() {//渲染函数，把星星渲染到table里
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j] == null) {
                continue;
            }
            squareSet[i][j].row = i;
            squareSet[i][j].col = j;
            squareSet[i][j].style.transition = "left 0.3s, bottom 0.3s";
            squareSet[i][j].style.position = 'absolute';
            squareSet[i][j].style.left = squareSet[i][j].col* squareWidth + 'px';
            squareSet[i][j].style.bottom = squareSet[i][j].row * squareWidth + 'px';
            squareSet[i][j].style.backgroundImage = 'url("./pic/' + squareSet[i][j].num + '.png")'
            squareSet[i][j].style.backgroundSize = 'cover'
            squareSet[i][j].style.transform = 'scale(0.95)'
            squareSet[i][j].style.boxSizing = 'border-box'

        }
    }
}


function createSquare(value, row, col) {//创造小方块
    var temp = document.createElement('div');
    temp.style.position = 'absolute';
    temp.style.width = squareWidth + 'px';
    temp.style.height = squareWidth + 'px';
    temp.style.borderRadius = '5px';
    temp.row = row;
    temp.col = col;
    temp.num = value;
    return temp;

}
function checkLinked(square, arr) {//计算被选中的星星周围有多少同类的小星星

    if (square == null) {
        return
    }
    arr.push(square)
    if (square.col > 0 && squareSet[square.row][square.col - 1] && square.num == squareSet[square.row][square.col - 1].num && arr.indexOf(squareSet[square.row][square.col - 1]) == -1) {
        checkLinked(squareSet[square.row][square.col - 1], arr)
    }
    if (square.col < squareNum - 1 && squareSet[square.row][square.col + 1] && square.num == squareSet[square.row][square.col + 1].num && arr.indexOf(squareSet[square.row][square.col + 1]) == -1) {
        checkLinked(squareSet[square.row][square.col + 1], arr)
    }
    if (square.row > 0 && squareSet[square.row - 1][square.col] && square.num == squareSet[square.row - 1][square.col].num && arr.indexOf(squareSet[square.row - 1][square.col]) == -1) {
        checkLinked(squareSet[square.row - 1][square.col], arr)
    }
    if (square.row < squareNum - 1 && squareSet[square.row + 1][square.col] && square.num == squareSet[square.row + 1][square.col].num && arr.indexOf(squareSet[square.row + 1][square.col]) == -1) {
        checkLinked(squareSet[square.row + 1][square.col], arr)
    }
    console.log(arr)
}
function flicker(arr) {//让选中的星星闪啊闪
    var num = 0;
    if (arr.length == 0) {
        return
    }
    timer = setInterval(function () {
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.border = '3px solid #bfefff'
            arr[i].style.transform = 'scale(' + (0.90 + 0.05 * Math.pow(-1, num)) + ')'

        }
        num++
    }, 300)
}
function goback() {//切换函数，切换星星闪的状态
    if (timer !== null) {
        clearInterval(timer)
    }
    for (var i = 0; i < squareSet.length; i++) {
        for (var j = 0; j < squareSet[i].length; j++) {
            if (squareSet[i][j]) {
                squareSet[i][j].style.border = '0px solid #bfefff';
                squareSet[i][j].style.transform = 'scale(0.95)'
            }
        }
    }

}
function mouseover(obj) {//鼠标悬停事件
    if(!key){
        return
    }
    choose = [];
    goback();
    checkLinked(obj, choose);
    flicker(choose)
}
function move() {//移动事件
    for (var i = 0; i < squareNum; i++) {
        var pointer = 0;
        for (var j = 0; j < squareNum; j++) {
            if (squareSet[j][i] != null) {
                if (j != pointer) {
                    squareSet[pointer][i] = squareSet[j][i];
                    squareSet[j][i].row = pointer;
                    squareSet[j][i] = null;
                }
                pointer++;
            }
        }
    }

    for (var i = 0; i < squareSet[0].length;) {
        if (squareSet[0][i] == null) {
            for (var j = 0; j < squareNum; j++) {
                squareSet[j].splice(i, 1)
            }
            continue;
        }
        i++
    }
    key=true;
    refresh()
}
function init() {//初始化函数
    var table = document.getElementsByClassName('sky')[0];
    for (var i = 0; i < squareNum; i++) {
        squareSet[i] = [];
        for (var j = 0; j < squareNum; j++) {
            var square = createSquare(Math.floor(Math.random() * 5), i, j);
            
            square.onmouseover = function () {
                mouseover(this)
            }
            square.onclick = function () {
               if(key){
                   key = false;
                if (choose.length > 1) {
                    for (var i = 0; i < choose.length; i++) {
                        (function (i) {
                            setTimeout(function () {
                                squareSet[choose[i].row][choose[i].col] = null;
                                table.removeChild(choose[i]);
                            }, i * 100);
                        })(i);
                    }
                }
               setTimeout(function(){
                   move()
               },700)

               }
            }
            squareSet[i][j] = square;
            table.appendChild(square);
        }
    }
    refresh()
}
window.onload = function () {
    init()
}