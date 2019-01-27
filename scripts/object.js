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
        if(this.elem)
        {
            document.getElementById("myDIV").style.transform = "translate(1)";
            this.elem.transform
        }
        console.log("Left : "+this.x);
        this.x -= 1;
    };
    
    Right() {
        if(this.elem)
        {
            document.getElementById("myDIV").style.transform = "translate(1)";
            this.elem.transform
        }
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
};

