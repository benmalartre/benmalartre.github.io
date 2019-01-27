var ENEMY_COUNTER = 0
var ENEMY_UNIQUE_ID = 0

class Enemy_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.ENEMY, x, y, z, ENEMY_UNIQUE_ID);
        ENEMY_UNIQUE_ID += 1;
        ENEMY_COUNTER += 1;
        this.elem.style.width = Math.random(64)+32+'px';
        this.elem.style.height = Math.random(64)+32+'px';
        this.elem.style.color = "white";
        this.elem.style.background = GetColorString(GetRandomColor());
        this.elem.innerHTML = "Enemy"+this.id;
        this.elem.style.top = x+'px';
        this.elem.style.left = y+'px';

        this.energy = 100;
        this.hungry = Math.random() * 100;
        this.dangerous = Math.random() * 100;
        this.damage = 0;
        this.jump_counter = 0;
    }

    Init(){
        this.x = Math.random() * 250;
        this.y = Math.random() * 250;
        this.z = Math.random() * 100;
     }

    Wander(){
        this.x += (Math.random() * 10)-5;
        this.y += (Math.random() * 10)-5;
        //this.elem.style.left = this.x +'px';
        //this.elem.style.top = this.y +'px';
        this.elem.style.transform = 'translate('+this.x+'px, '+this.y+'px)';


        //this.elem.style.transform = 'translateY('+this.y+')';
        //this.elem.style.transform = 'rotate('+(Math.random()*10-5)+'deg)';
    }

    Update(){
        this.Wander();
        this.elem.style.background = GetColorString(GetRandomColor());
    }
}

