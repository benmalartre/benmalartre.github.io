window.requestAnimationFrame = 
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame	||
window.msRequestAnimationFrame;

window.addEventListener('load', InitGame, false);
include('scripts/math.js');
include('scripts/object.js');
include('scripts/mouse.js');
include('scripts/keyboard.js');
include('scripts/player.js');

console.log(NUM_LOADING);

class Game {
    constructor(){
        this.objects = new Array();
        this.player = null;
        this.events = new Array();
    }

    AddObject(object) {
        this.objects.push(object);
    }
    
    Update(){
        /*
        for(var i=0;i<this.objects.length;i++){
            this.objects[i].Update();
        }*/
    }

    Init() {
        this.player = new Player(250,25);
        this.objects.push(this.player);

        this.events.push(new KeyEvent('Space', this.player, "Jump"));
        this.events.push(new KeyEvent('ArrowLeft', this.player, "Left"));
        this.events.push(new KeyEvent('ArrowRight', this.player, "Right"));
        this.events.push(new KeyEvent('ArrowUp', this.player, "Up"));
        this.events.push(new KeyEvent('ArrowDown', this.player, "Down"));

        /*
        for(var i=0;i<this.objects.length;i++){
            this.objects[i].Init();
        }
        */
        alert( "GAME LOADED ! START NOW");
        setInterval(function(){this.Update},1000/60);
    };

};

function InitGame(){
    var game = new Game();
	game.Init();
}