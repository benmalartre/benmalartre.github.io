'use strict';
var WALL_LASTPOINT = {'x': 0, 'y': 0};
var WALL_OFFSET = {'x': 0, 'y': 0};
var WALL_DRAWING = false;
var WALL_NEWPOINT = {'x': 0, 'y': 0};
var WALL_CTX = null;

var BRUSH = new Image();
BRUSH.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

class Sticker_t{
    constructor(){

    }
}

class Wall_t{
    constructor(){
        this.container = document.createElement('div');
        this.container.style.borderRadius = '12px';
        this.container.style.overflow = 'hidden';
        this.container.style.position = 'absolute';
        this.container.style.top = '40px';
        this.container.style.margin = 'auto';
        this.container.style.zIndex = 1000;
        this.container.style.backgroundColor = GetColorHex(GetRandomColor(1,0,0,0.5));
        this.container.style.color = 'white';
        this.container.style.fontSize = '2em';

        this.hello = document.createElement('h1');
        this.hello.textContent = 'HELLO';
        this.hello.style.position = 'absolue';
        this.hello.style.margin = 'auto';
        this.hello.style.textAlign = 'center';
        this.hello.style.userSelect = 'none';
        this.hello.style.zIndex = 1001;

        this.myname = document.createElement('h3');
        this.myname.textContent = 'my name is';
        this.myname.style.userSelect = 'none';
        this.myname.style.zIndex = 1001;
        
        this.board = document.createElement('div');
        this.board.style.position = 'absolute';
        this.board.style.top = '25%';
        this.board.style.left = '0px';
        this.board.style.width = '100%';
        this.board.style.height = '66%';
        this.board.style.userSelect = 'none';
        this.board.style.backgroundColor = 'white';
        this.board.style.zIndex = 1001;
 
        this.canvas = document.createElement('canvas');
        this.canvas.style.zIndex = 1002;
        WALL_CTX = this.canvas.getContext('2d');

        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0px';
        this.canvas.style.left = '0px';
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        WALL_CTX.lineJoin = 'round';

        this.canvas.addEventListener('mousedown', this.OnMouseDown);
        this.canvas.addEventListener('mousemove', this.OnMouseMove);
        this.canvas.addEventListener('mouseup', this.OnMouseUp);

        this.canvas.addEventListener('touchstart', this.OnMouseDown);
        this.canvas.addEventListener('touchmove', this.OnMouseMove);
        this.canvas.addEventListener('touchend', this.OnMouseUp);

        this.ClearBackground();
        this.container.appendChild(this.hello);
        this.container.appendChild(this.myname);
        this.container.appendChild(this.board);
        this.container.appendChild(this.canvas);
        
        app.Mount(this.container);
    }

    ClearBackground(){
        //WALL_CTX.fillStyle = 'white';
        //WALL_CTX.fillRect(0, 0, WALL_CTX.canvas.width, WALL_CTX.canvas.height);
    }

    OnMouseDown(e){
        WALL_DRAWING = true;
        if(e.type === 'touchstart'){
            WALL_LASTPOINT = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        }
        else{
            WALL_LASTPOINT = {x: e.clientX, y: e.clientY};
        }
    }

    OnMouseUp(e){
        WALL_DRAWING = false;
    }

    OnMouseMove(e){
        var x, y;
        e.preventDefault();
       if(WALL_DRAWING){
            if(e.type === 'touchmove'){
                WALL_NEWPOINT = {x: e.touches[0].clientX, y: e.touches[0].clientY};
            }
            else{
                WALL_NEWPOINT = {x: e.clientX, y: e.clientY};
            }
            
            var dist = distanceBetween(WALL_LASTPOINT, WALL_NEWPOINT);
            var angle = angleBetween(WALL_LASTPOINT, WALL_NEWPOINT);
            WALL_CTX.fillColor = 'black';
            for(var i =0;i<dist;i++){
                x = WALL_LASTPOINT.x + (Math.sin(angle)*i)-25;
                y = WALL_LASTPOINT.y + (Math.cos(angle)*i)-25;
                WALL_CTX.drawImage(BRUSH, x, y);
                //WALL_CTX.fillRect(x, y,20,20);
            }

            WALL_LASTPOINT = WALL_NEWPOINT;
        }
    }
}

var wall = new Wall_t()


/*
var ctx = el.getContext('2d');
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmousemove = function(e) {
  if (!isDrawing) return;
  
  var currentPoint = { x: e.clientX, y: e.clientY };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);
  
  for (var i = 0; i < dist; i++) {
    x = lastPoint.x + (Math.sin(angle) * i) - 25;
    y = lastPoint.y + (Math.cos(angle) * i) - 25;
    ctx.drawImage(img, x, y);
  }
  
  lastPoint = currentPoint;
};

el.onmouseup = function() {
  isDrawing = false;
};
}*/