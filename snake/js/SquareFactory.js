function SquareFactory(){}
SquareFactory.create =function(type,x,y,color){
    if(typeof SquareFactory.prototype[type]==undefined){
        throw 'erro'
    }
    if(SquareFactory.prototype[type].prototype._proto_ != SquareFactory.prototype){
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    var newSquare = new SquareFactory.prototype[type](x,y,color);
    return newSquare
}
SquareFactory.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREHEIGHT + 'px';
}
SquareFactory.prototype.init=function(square,color,strategyMessage){
square.viewContent.style.position = 'absolute';
square.viewContent.style.background = color;
square.viewContent.style.top = square.y*SQUAREWIDTH+'px';
square.viewContent.style.left = square.x*SQUAREHEIGHT+ 'px';
square.viewContent.style.width = square.width+'px';
square.viewContent.style.height = square.height+'px';
square.touch = function(){
    return strategyMessage
}

}
SquareFactory.prototype.Stone = function(x,y,color){
    var stone = new Stone(x,y,SQUAREWIDTH,SQUAREHEIGHT)
    this.init(stone,color,STRATEGYMESSAGE.DIE)
    return stone


}
SquareFactory.prototype.Floor = function(x,y,color){
    var floor = new Floor(x,y,SQUAREWIDTH,SQUAREHEIGHT)
    this.init(floor,color,STRATEGYMESSAGE.MOVE)
    return floor
    
}
SquareFactory.prototype.Food = function(x,y,color){
    var food = new Food(x,y,SQUAREWIDTH,SQUAREHEIGHT)
    this.init(food,color,STRATEGYMESSAGE.EAT)
    food.update(x,y)
    return food
    
}
SquareFactory.prototype.Snakehead = function(x,y,color){
    var sh = new SnakeHead(x,y,SQUAREWIDTH,SQUAREHEIGHT)
    this.init(sh,color,STRATEGYMESSAGE.DIE)
    sh.update(x,y)
    return sh
}
SquareFactory.prototype.Snakebody = function(x,y,color){
    var sb = new SnakeBody(x,y,SQUAREWIDTH,SQUAREHEIGHT)
    this.init(sb,color,STRATEGYMESSAGE.DIE)
    return sb
}