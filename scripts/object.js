var OBJECT_TYPE = {
    OBJECT_PLAYER: 1,
    OBJECT_ENEMY: 2,
    OBJECT_GROUND: 3,
    OBJECT_OBSTACLE: 4,
    OBJECT_PART: 5
  };

class Object_t{
    constructor(cls, x, y, z, elem, id){
        this.id = id
        this.cls = cls;
        this.elem = elem;
        this.entity = null;
        this.position = new SAT.Vector(x, y);
        this.rotation = 0.0;
        this.scale = new SAT.Vector(1,1);
        this.cog = new SAT.Vector(0,0);
        this.Z = z;
        this.collide = false;
    }

    SetPosition(x, y, z){
        this.position.x = x;
        this.position.y = y;
        this.Z = z;
    }
    
    Draw(){
    }

    Left() {
        this.force.x -= 1;
        //if(this.elem)this.elem.style.left = this.position.x+'px';
    };
    
    Right() {
        this.force.x += 1;
        //if(this.elem)this.elem.style.left = this.position.x+'px';
    };
    
    Up() {
        this.Z -=5;
        this.force.y -= 1;
        //if(this.elem)this.elem.style.top = this.position.y+'py';
    };
    
    Down() {
        this.Z += 5;
        this.force.y += 1;
        //if(this.elem)this.elem.style.top = this.position.y+'py';
    };

    Forward() {
        this.Z += 1;
    };
    
    Backward() {
        this.Z -= 1;
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

