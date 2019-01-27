function Player(x, y) {
    Object.call(this, OBJECT_TYPE.PLAYER, x, y);
    this.energy = 100;
    this.damage = 0;
    this.jump_counter = 0;
}

Player.prototype.jump = function(){
    this.jump_counter += 1;
    console.log("Jump : "+this.jump_counter);
}