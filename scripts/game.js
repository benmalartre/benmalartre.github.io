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

function Game() {
    this.objects = new Array();
    this.player = null;
    this.space_pressed = null;
};

Game.prototype.Init = function() {

    this.player = new Player(0,0);
    this.space_pressed = new KeyEvent('Space', this.player.jump);
    for(var i=0;i<this.objects.length;i++){
        this.objects[i].Init();
    }

    alert( "GAME LOADED ! START NOW");
};

Game.prototype.AddObject = function(object) {
    this.objects.push(object);
}

Game.prototype.Update = function(){
    for(var i=0;i<this.objects.length;i++){
        this.objects[i].Update(m_x,m_y);
    }
}

function InitGame(){
    var game = new Game();
	game.Init();
}