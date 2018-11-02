var XLEN = 30;
var YLEN = 30;
var SQUAREWIDTH = 20;
var SQUAREHEIGHT = 20;
var INTERVAL = 300;
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;
function Square(x, y, width, height, dom) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.viewContent = dom || document.createElement('div');



}
Square.prototype.touch = function () { };
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREHEIGHT + 'px';
}
var Floor = tool.extends(Square);
var Stone = tool.extends(Square);
var Food = tool.single(Square);

var SnakeHead = tool.single(Square);

var SnakeBody = tool.extends(Square);
var Snake = tool.single(Square)
var Ground = tool.single(Square);
var Game = tool.single();
var STRATEGYMESSAGE = {
    MOVE: 'MOVE',
    EAT: 'EAT',
    DIE: 'DIE',
}

