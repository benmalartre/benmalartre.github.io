function Object(cls, x, y) {
    this.cls = cls;
    this.x = x;
    this.y = y;
};

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