class Player extends Object{
    constructor(x, y){
        super(OBJECT_TYPE.PLAYER, x, y);
        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
    }

    Jump(){
        this.jump_counter += 1;
        console.log("Jump : ");
        console.log(this.jump_counter);
    }
}

