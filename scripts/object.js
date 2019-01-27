var OBJECT_TYPE = {
    PLAYER: 1,
    ENEMY: 2,
    BACKGROUND: 3
  };

class Object {
    constructor(cls, x, y, elem){
        this.cls = cls;
        this.elem = elem;
        this.x = x;
        this.y = y;
    }
    
    SetPosition(x, y){
        this.x = x;
        this.y = y;
    }
    
    Draw(){
    }
    
    Left() {
        this.x -= 1;
    };
    
    Right() {
        this.x += 1;
    };
    
    Up() {
        this.y += 1;
    };
    
    Down() {
        this.y -= 1;
    };
};

