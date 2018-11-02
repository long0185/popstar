var ground = new Ground(BASE_X_POINT,BASE_Y_POINT,XLEN*SQUAREWIDTH,YLEN*SQUAREHEIGHT);
ground.init =function() {
this.viewContent.style.position = 'absolute';
this.viewContent.style.background = 'pink';
this.viewContent.style.top = this.x+'px';
this.viewContent.style.left = this.y+ 'px';
this.viewContent.style.width = this.width+'px';
this.viewContent.style.height = this.width+'px';
document.body.appendChild(this.viewContent);
this.squareTable = [];
for(var i = 0;i<YLEN;i++){
    this.squareTable[i] =[]; 
    for(var j = 0;j < XLEN;j++){
        if(i==0 ||j == 0||i == YLEN-1||j == XLEN-1){
           var newsquare = SquareFactory.create('Stone',j,i,'black')
        }else{
            var newsquare = SquareFactory.create('Floor',j,i,'grey')
        }
        this.squareTable[i][j] = newsquare;
        this.viewContent.appendChild(newsquare.viewContent)
    }
};
};
ground.remove = function(x,y){
    this.viewContent.removeChild(this.squareTable[y][x].viewContent);
     this.squareTable[y][x]=null;
};
ground.append = function(square){
    this.squareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
    
};
