window.requestAnimationFrame = 
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame	||
window.msRequestAnimationFrame;

window.addEventListener('load', InitGame, false);

function loadCharacters(){
    include('scripts/player.js');
    include('scripts/enemy.js');
}
include('scripts/math.js');
include('scripts/color.js');
include('scripts/object.js');
include('scripts/mouse.js');
include('scripts/keyboard.js');
include('scripts/character.js', loadCharacters);

console.log(NUM_LOADING);

class Game {
    constructor(){
        this.view = document.getElementById('GameContainer');
        this.view.style.width = document.width;
        this.view.style.height = document.height;
        this.view.style.position = 'relative';
        this.view.style = 'orange';

        this.view.requestFullscreen();

        this.objects = new Array();
        this.player = null;
        this.enemies = new Array();
        this.events = new Array();
    }

    AddObject(obj) {
        this.objects.push(obj);
    }
    
    Update(){
        console.log("GAME UPDATE");
        for(var i=0;i<this.objects.length;i++){
            this.objects[i].Update();
        }
    }

    Init() {
        this.player = new Player(250,25);
        this.objects.push(this.player);

        this.events.push(new KeyEvent('Space', this.player, 'Jump'));
        this.events.push(new KeyEvent('ArrowLeft', this.player, 'Left'));
        this.events.push(new KeyEvent('ArrowRight', this.player, 'Right'));
        this.events.push(new KeyEvent('ArrowUp', this.player, 'Up'));
        this.events.push(new KeyEvent('ArrowDown', this.player, 'Down'));

        var numEnemies = Math.random() * 12 + 6;
        var w = document.width;
        var h = document.height;
        for(var i=0; i<numEnemies;i++)
        {
            var enemy = new Enemy(Math.random()*1000, Math.random()*2000);
            this.enemies.push(enemy );
            this.objects.push(enemy);
        }
    };

};

var game;
function UpdateGame(){
    game.Update();
}
function InitGame(){
    game = new Game();
    game.Init();
    setInterval(UpdateGame,1000/60);
}