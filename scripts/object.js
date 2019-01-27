var OBJECT_TYPE = {
    PLAYER: 1,
    ENEMY: 2,
    BACKGROUND: 3
  };

function Object(cls, x, y, elem) {
    this.cls = cls;
    this.elem = elem;
    this.x = x;
    this.y = y;
};

Object.prototype.SetPosition = function(x, y){
    this.x = x;
    this.y = y;
}

Object.prototype.Draw = function(){
    consol
}
Object.prototype.Left = function() {
    this.x -= 1;
};

Object.prototype.Right = function() {
    this.x += 1;
};

Object.prototype.Up = function() {
    this.y += 1;
};

Object.prototype.Down -= function() {
    this.x -= 1;
};