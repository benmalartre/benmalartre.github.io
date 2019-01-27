class Character extends Object{
    constructor(type, x, y){
        var elem = document.createElement('div');
        
        elem.style.position = "absolute";
        elem.style.display = 'block';
        elem.style.zIndex = 99;

        document.getElementById("GameContainer").appendChild(elem);

        super(type, x, y, elem);
        
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
        console.log("PLAYER Jump : ");
        console.log(this.jump_counter);
        console.log("PLAYER POSITION : "+this.x+", "+this.y);

        this.x = Math.random() * 120;
        this.y = Math.random() * 120;
       this.elem.style.left = this.x +'px';
       this.elem.style.top = this.y +'px';
    }

    
    
}

