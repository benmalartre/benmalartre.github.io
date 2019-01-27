class Player extends Object{
    constructor(x, y){
        var elem = document.createElement('div');
        elem.style.width = "100px";
        elem.style.height = "100px";
        elem.style.background = "red";
        elem.style.color = "white";
        elem.innerHTML = "Hello";
        
        document.getElementsByTagName('body')[0].appendChild(elem);

        super(OBJECT_TYPE.PLAYER, x, y, elem);
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

