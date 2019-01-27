var OBJECT_TYPE = {
    PLAYER: 1,
    ENEMY: 2,
    BACKGROUND: 3
  };

class Object{
    constructor(cls, x, y, elem){
        this.cls = cls;
        this.elem = elem;
        this.x = x;
        this.y = y;
    }

    Init(){
        this.x = 0;
        this.y = 0;
    }
    
    SetPosition(x, y){
        this.x = x;
        this.y = y;
    }
    
    Draw(){
    }

    Left() {
        console.log("Left : "+this.x);
        this.x -= 1;
    };
    
    Right() {
        console.log("Right : "+this.x);
        this.x += 1;
    
    };
    
    Up() {
        console.log("Up : "+this.y);
        this.y += 1;
    };
    
    Down() {
        console.log("Down : "+this.y);
        this.y -= 1;
    };

    Update(){
        if(this.elem)
        {
            this.elem.style.x = this.x;
            this.elem.style.y = this.y;
        }
    }
};

