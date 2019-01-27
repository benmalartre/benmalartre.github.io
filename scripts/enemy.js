var ENEMY_COUNTER = 0
var ENEMY_UNIQUE_ID = 0

class Enemy extends Character{
    constructor(x, y){
        
        super(OBJECT_TYPE.ENEMY, x, y, ENEMY_UNIQUE_ID);
        ENEMY_UNIQUE_ID += 1;
        ENEMY_COUNTER += 1;
        this.elem.style.width = Math.random(64)+32+'px';
        this.elem.style.height = Math.random(64)+32+'px';
        this.elem.style.color = "white";
        this.elem.style.background = "red";
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
        this.x = Math.random() * document.width;
        this.y = Math.random() * document.height;
     }

    Wander(){
        //this.jump_counter;
        console.log("ENEMEY Jump : ");
        console.log(this.jump_counter);
        console.log("ENEMY POSITION : "+this.x+", "+this.y);

        this.x = Math.random() * 120;
        this.y = Math.random() * 120;
        this.elem.style.left = this.x +'px';
        this.elem.style.top = this.y +'px';
    }
}

