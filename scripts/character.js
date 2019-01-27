class Character extends Object{
    constructor(type, x, y){
        var elem = document.createElement('div');
        elem.style.width = "100px";
        elem.style.height = "100px";
        elem.style.background = "red";
        elem.style.color = "white";
        elem.innerHTML = "Hello";
        elem.style.position = "absolute";
        elem.style.padding = '10px';
        elem.style.background = '#00ff00';
        elem.style.display = 'block';
        elem.style.zIndex = 99;
        elem.style.top = Math.random() * 120+'px';
        elem.style.left = Math.random() * 120+'px';
        
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

