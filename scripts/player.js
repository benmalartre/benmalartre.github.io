class Player_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.PLAYER, x, y, z, 0);
        this.elem.style.width = '64px';
        this.elem.style.height = '64px';
        this.elem.style.color = 'white';
        this.elem.style.background = 'green';
        this.elem.innerHTML = 'HERO';
        this.elem.style.top = x+'px';
        this.elem.style.left = y+'px';

        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
    }

    Init(){
        this.x = Math.random() * document.width;
        this.y = Math.random() * document.height;
     }

    Jump(){
        this.x = Math.random() * 120;
        this.y = Math.random() * 120;
        this.elem.style.left = this.x +'px';
        this.elem.style.top = this.y +'px';
    }

    Update(){
        
    }
    
    
}

