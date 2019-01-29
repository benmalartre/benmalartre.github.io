class Player_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.OBJECT_PLAYER, x, y, z, 0);
        this.elem.style.width = '64px';
        this.elem.style.height = '64px';
        this.elem.style.color = 'white';
        this.elem.style.background = 'green';
        this.elem.innerHTML = 'HERO';

        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
        this.mass = 10.0;
    }

    Init(){

    }

    Jump(){
        if(this.grounded){
            this.force.y -= 150;
            this.grounded = false;
        }
    }

    Update(){
        //this.Wander();
        this.elem.style.transform = 'translate('+this.position.x+'px, '+this.position.y+'px)';
        if(this.collide)
            this.elem.style.background = 'red';//GetColorString(GetRandomColor());
        else
            this.elem.style.background = 'green';//GetColorString(GetRandomColor());
    }
    
    
}

