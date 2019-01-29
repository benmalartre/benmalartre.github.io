window.requestAnimationFrame = 
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame	||
window.msRequestAnimationFrame;


var elem = document.documentElement;

// View in fullscreen
function OpenFullscreen() {
    console.log("OPEn FULL SCRREEN CALLZD..3");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE
    elem.msRequestFullscreen();
  }
}

// Close fullscreen
function CloseFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox 
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}

window.addEventListener('load', InitGame, false);
document.addEventListener('click', OpenFullscreen, false);

function loadPassives(){
    include('scripts/ground.js');
    include('scripts/wire.js');
}

function loadActives(){
    include('scripts/player.js');
    include('scripts/enemy.js');
    include('scripts/world.js');
    include('scripts/integration.js');
}

include('scripts/math.js');
include('scripts/color.js');
include('scripts/texture.js');
include('scripts/object.js');
include('scripts/mouse.js');
include('scripts/keyboard.js');
include('scripts/passive.js', loadPassives);
include('scripts/active.js', loadActives);


console.log(NUM_LOADING);

class Game_t {
    constructor(){
/*
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
*/
        this.view = document.createElement('div');
        this.view.id = 'GameContainer';
        this.view.style.position = 'fixed';
        this.view.style.width = '1080px';
        this.view.style.height = '640px';
        this.view.style.margin = 'auto';
        this.view.style.overflow = 'hidden';
        this.view.style.border = '4px orange solid';
        this.view.style.background = 'rgba(120,180,255,122)';

        document.body.appendChild(this.view);
        //this.container.appendChild(this.view);
        

        this.world = null;
        this.objects = new Array();
        this.player = null;
        this.enemies = new Array();
        this.ground = null;
        this.events = new Array();
        this.integrator = null;
    }

    AddObject(obj) {
        this.objects.push(obj);
    }
    
    Update(){
        this.ground.Activate(this.player.position);
        this.ground.Update();

        this.integrator.Step();
        this.world.Collide();
        
    }

    Init() {
        this.player = new Player_t(250,0,0);
        this.ground = new Ground_t(4096,256);

        this.objects.push(this.player);
        this.objects.push(this.ground);

        this.events.push(new KeyEvent('Space', this.player, 'Jump'));
        this.events.push(new KeyEvent('ArrowLeft', this.player, 'Left'));
        this.events.push(new KeyEvent('ArrowRight', this.player, 'Right'));
        this.events.push(new KeyEvent('ArrowUp', this.player, 'Up'));
        this.events.push(new KeyEvent('ArrowDown', this.player, 'Down'));

        var numEnemies = 0;//Math.random() * 128 + 6;
        var w = document.width;
        var h = document.height;
        for(var i=0; i<numEnemies;i++)
        {
            var enemy = new Enemy_t(Math.random()*100, Math.random()*100, Math.random()*100);
            this.enemies.push(enemy );
            this.objects.push(enemy);
        }
        /*
        var h = Math.random(200);
        var x = 0;
        var wire = new Wire_t(x, h,800,h);
        this.objects.push(wire);
        */
        this.integrator = new Integrator_t(this.objects, "euler");
        this.world = new World_t(this.objects);
    };

};

var game;
function UpdateGame(){
    game.Update();
}
function InitGame(){
    game = new Game_t();
    game.Init();
    
    setInterval(UpdateGame,1000/60);
}