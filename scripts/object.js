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

    SetPosition(x, y){
        this.x = x;
        this.y = y;
    }
    
    Draw(){
    }

    Left() {
        this.x -= 1;
        if(this.elem)this.elem.style.left = this.x+'px';
    };
    
    Right() {
        console.log("Right : "+this.x);
        this.x += 1;
        if(this.elem)this.elem.style.left = this.x+'px';
    };
    
    Up() {
        console.log("Up : "+this.y);
        this.y += 1;
        if(this.elem)this.elem.style.top = this.x+'py';
    };
    
    Down() {
        console.log("Down : "+this.y);
        this.y -= 1;
        if(this.elem)this.elem.style.top = this.x+'py';
    };

    Update(){
        /*
        if(this.elem)
        {
            this.elem.style.left = this.x;
            this.elem.style.top = this.y;
        }
        */
    }
};

