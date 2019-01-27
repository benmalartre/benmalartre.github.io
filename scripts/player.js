class Player extends Object{
    constructor(x, y){
        super(OBJECT_TYPE.PLAYER, x, y);
        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
    }

    Jump(){
        //this.jump_counter;
        console.log("Jump : ");
        console.log(this.jump_counter);
        console.log("POSITION : "+this.x+", "+this.y);
    }
}

