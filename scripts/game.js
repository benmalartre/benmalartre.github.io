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

function Game(){
    this.objects = new Array();

    this.Init = function(){
        for(var i=0;i<this.objects.length;i++){
            this.objects[i].Init();
        }

    }
    this.AddObject = function(object){
        this.objects.push(object);
    }

    this.Update = function(m_x,m_y){
        for(var i=0;i<this.objects.length;i++){
            this.objects[i].Update(m_x,m_y)
        }

    }
    game = this;
    return this;
}
function InitGame(){
    game.Init();
}

