var OBJECT_TYPE = {
    PLAYER: 1,
    ENEMY: 2,
    BACKGROUND: 3
  };

class Object_t{
    constructor(cls, x, y, z, elem, id){
        this.id = id
        this.cls = cls;
        this.elem = elem;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    SetPosition(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    Draw(){
    }

    Left() {
        this.x -= 1;
        if(this.elem)this.elem.style.left = this.x+'px';
    };
    
    Right() {
        this.x += 1;
        if(this.elem)this.elem.style.left = this.x+'px';
    };
    
    Up() {
        this.y += 1;
        if(this.elem)this.elem.style.top = this.x+'py';
    };
    
    Down() {
        this.y -= 1;
        if(this.elem)this.elem.style.top = this.x+'py';
    };

    Forward() {
        this.z += 1;
    };
    
    Backward() {
        this.z -= 1;
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

