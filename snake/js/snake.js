var snake = new Snake();
snake.head = null;
snake.tail = null;
var DIRECTION = {
    LEFT: {
        x: -1,
        y: 0,
    },
    RIGHT: {
        x: 1,
        y: 0,
    },
    UP: {
        x: 0,
        y: -1,
    },
    DOWN: {
        x: 0,
        y: 1,
    }
}
snake.init = function (ground) {
    var snakeHead = SquareFactory.create('Snakehead', 1, 3, 'blue');
    var snakeBody1 = SquareFactory.create('Snakebody', 1, 2, 'grey');
    var snakeBody2 = SquareFactory.create('Snakebody', 1, 1, 'grey');
    this.head = snakeHead;
    this.tail = snakeBody2;
    this.direction = DIRECTION.DOWN;
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);
}
snake.strargies = {
    MOVE: function (snake, square, ground,fromEat) {
        var newBody = SquareFactory.create('Snakebody',snake.head.x,snake.head.y,'purple');
         newBody.next = snake.head.next;
         newBody.next.last = newBody;
         newBody.last = null;
         ground.remove(snake.head.x,snake.head.y)
         ground.append(newBody);
         var newHead = SquareFactory.create('Snakehead',square.x,square.y,'blue');
         newHead.next = newBody;
         newHead.last = null;
         newBody.last = newHead
         ground.remove(newHead.x,newHead.y)
         ground.append(newHead)
         if(!fromEat){
            ground.remove(snake.tail.x,snake.tail.y)
            var newFloor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'grey')
            ground.append(newFloor);
            snake.tail = snake.tail.last;
            snake.tail.next = null;
         }
         snake.head = newHead;
    },
    EAT: function (snake,square,ground) {
            this.MOVE(snake,square,ground,true);
            creatFood(ground);
            game.score++;
            game.speed--;
    },
    DIE: function () {
          game.over();
    }
}
snake.move = function (ground) {
    var square = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function') {
        this.strargies[square.touch()](this,square,ground)

    }
}
