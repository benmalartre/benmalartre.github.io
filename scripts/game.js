window.requestAnimationFrame = 
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame	||
window.msRequestAnimationFrame;

var game;
window.addEventListener('load', InitGame, false);

include('scripts/math.js');
include('scripts/object.js');
include('scripts/mouse.js');
include('scripts/keyboard.js');

console.log(NUM_LOADING);

function Game() {
    this.objects = new Array();
};

Game.prototype.Init = function() {
    for(var i=0;i<this.objects.length;i++){
        this.objects[i].Init();
    }
};

Game.prototype.AddObject = function(object) {
    this.objects.push(object);
}

Game.prototype.Update = function(){
    for(var i=0;i<this.objects.length;i++){
        this.objects[i].Update(m_x,m_y);
    }
}

var game = new Game();
game.Init();

