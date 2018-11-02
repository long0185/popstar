var game = new Game();
game.timer = null;
game.score = 0;
game.speed = 150;
game.init = function () {
    document.onkeydown = function (e) {
        if (e.which == 37 && snake.direction != DIRECTION.RIGHT) {
            snake.direction = DIRECTION.LEFT;
        } else if (e.which == 39 && snake.direction != DIRECTION.LEFT) {
            snake.direction = DIRECTION.RIGHT;
        } else if (e.which == 38 && snake.direction != DIRECTION.DOWN) {
            snake.direction = DIRECTION.UP;
        } else if (e.which == 40 && snake.direction != DIRECTION.UP) {
            snake.direction = DIRECTION.DOWN;
        }
    }
}
game.start = function (ground) {
    ground.init();
    snake.init(ground);
    creatFood(ground);
    game.init();
    this.timer = setInterval(() => {
        snake.move(ground)
    }, this.speed)
}
game.over = function () {
    clearInterval(game.timer);
    alert('得分:' + game.score)
}
function creatFood(ground) {
    var x = null;
    var y = null;
    var flag = true;
    var obj2 = {};
    var obj3 = {};
    var obj = (function () {
        var snakehead1 = snake.head;
        while (snake.head != null) {
            obj2[snake.head.x] = 1;
            obj3[snake.head.y] = 1; 
            snake.head = snake.head.next
        }
        snake.head = snakehead1;
        return obj2,obj3;
    })()
    console.log(obj2,obj3)
    while (flag) {
        x = 1 + Math.floor(Math.random() * 27);
        y = 1 + Math.floor(Math.random() * 27);
        if(!obj2[x] && !obj3[y]){
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'orange');
    ground.remove(food.x, food.y)
    ground.append(food)
}
//游戏开始
var oBtn = document.getElementById('btn');
oBtn.onclick = function () {
    game.score = 0;
    game.start(ground)
    
}