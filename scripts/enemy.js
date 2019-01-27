class Enemy extends Character{
    constructor(x, y){
        
        super(OBJECT_TYPE.ENEMY, x, y);
        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
    }

    Init(){
        this.x = Math.random() * document.width;
        this.y = Math.random() * document.height;
     }

    Jump(){
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

