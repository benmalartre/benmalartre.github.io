const CIRCLE_BEZIER_K = 0.552284749831; //4*(sqrt(2)-1)/3
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 128;

class Player_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.OBJECT_PLAYER, x, y, z, 0);
        this.elem.style.width = PLAYER_WIDTH+'px';
        this.elem.style.height = PLAYER_HEIGHT+'px';
        this.elem.style.color = 'white';
        this.elem.style.border = 'red 2px dotted';
        this.skin = document.createElement('div');
        this.fur = document.createElement('canvas');
        this.fur.style.position = 'absolute';
        this.fur.width = PLAYER_WIDTH*2;
        this.fur.height = PLAYER_HEIGHT;
        
        this.skin.style.position = 'relative';
        this.skin.style.width = PLAYER_WIDTH*2+'px';
        this.skin.style.height = PLAYER_HEIGHT+'px';
        
        this.skin.appendChild(this.fur);
        this.elem.appendChild(this.skin);

        //this.elem.innerHTML = 'HERO';
        this.mask =null;
        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
        this.mass = 10.0;
        this.xx = 0.0;
        this.incrx = 0.25;
        this.points = [];
        this.r1 = 32;
        this.r2 = 24
        this.h1 = 24;
        this.Init();
    }


    Init(){
        var context = this.fur.getContext( '2d' );
        //context.globalCompositeOperation ="source-over";
        context.fillStyle = 'white';
        context.fillRect(0,0,PLAYER_WIDTH*2, PLAYER_HEIGHT);
        
        context.beginPath();
        context.moveTo(0,0);
        context.bezierCurveTo(PLAYER_WIDTH *0.25,
                                0, 
                                PLAYER_WIDTH * 0.25, 
                                0, 
                                PLAYER_WIDTH, 
                                PLAYER_HEIGHT * 0.5);

        context.bezierCurveTo(PLAYER_WIDTH + PLAYER_WIDTH *0.5, 
                                PLAYER_HEIGHT * 0.5, 
                                PLAYER_WIDTH +PLAYER_WIDTH * 0.5, 
                                0,
                                2* PLAYER_WIDTH, 
                                0);

        context.lineTo(PLAYER_WIDTH*2, PLAYER_HEIGHT*0.5);
        context.lineTo(0, PLAYER_HEIGHT*0.5)
        context.closePath();
        //context.lineTo(PLAYER_WIDTH*1.5, PLAYER_HEIGHT * 0.5)
        
        //context.lineTo(PLAYER_WIDTH*2, Math.random() * PLAYER_HEIGHT);
        //context.lineTo(PLAYER_WIDTH, Math.random() * PLAYER_HEIGHT);
        context.lineTo(0, PLAYER_HEIGHT * 0.5);
        context.closePath();

        context.fillStyle = 'black';
        context.fill();
        
        /*
        for(var i=0;i<64;i++){
            context.beginPath();
            context.arc(Math.random()*PLAYER_WIDTH,
                        Math.random()*PLAYER_HEIGHT,
                        Math.random()*12+6,
                        0,
                        2 * Math.PI,
                        false);
            context.closePath();
            context.fillStyle = GetColorString(GetRandomColor());
            context.fill();
            
            context.lineWidth = Math.random()*3+1;
            context.strokeStyle = '#000000';
            context.stroke();
            
        }
        */
        
        
        this.GetPoints();
        this.mask =  new Mask_t(this.elem, this.skin, this.points);
    }

    Jump(){
        if(this.grounded){
            this.force.y -= 150;
            this.grounded = false;
        }
    }

    GetPoints(){
        this.points = [];
        // bottom circle
        var br1 = this.r1 * CIRCLE_BEZIER_K;
        var br2 = this.r2 * CIRCLE_BEZIER_K;
        var ox = 32;
        this.points.push(new SAT.Vector(0+ox,0));
        this.points.push(new SAT.Vector(br1+ox,0));
        this.points.push(new SAT.Vector(this.r1+ox, this.r1-br1+this.h1*0.5))
        this.points.push(new SAT.Vector(this.r1+ox,this.r1+this.h1));

        this.points.push(new SAT.Vector(this.r1+ox, this.r1 + br1 + this.h1));
        this.points.push(new SAT.Vector(br1+ox, this.r1 * 2 + this.h1));
        this.points.push(new SAT.Vector(0+ox,this.r1 * 2 + this.h1));

        this.points.push(new SAT.Vector(-br1+ox,this.r1 * 2 + this.h1));
        this.points.push(new SAT.Vector(-this.r1+ox, this.r1 + br1 + this.h1));
        this.points.push(new SAT.Vector(-this.r1+ox, this.r1 + this.h1));

        this.points.push(new SAT.Vector(-this.r1+ox, this.r1-br1 + this.h1));
        this.points.push(new SAT.Vector(-br1+ox,0 + this.h1*0.5));
        this.points.push(new SAT.Vector(0+ox,0));
        //this.points.push(new SAT.Vector(-br1+ox, this.r1 - br1));
        //this.points.push(new SAT.Vector(0+ox, 0));

        /*
        this.points.push(new SAT.Vector(0,0));
        this.points.push(new SAT.Vector(this.r1 * CIRCLE_BEZIER_K,));
        this.points.push(new SAT.Vector(this.r1, this.r1-(this.r1 * CIRCLE_BEZIER_K)));
        this.points.push(new SAT.Vector(this.r1 * CIRCLE_BEZIER_K,this.r1));

        this.points.push(new SAT.Vector(0,0));
        this.points.push(new SAT.Vector(this.r1 * CIRCLE_BEZIER_K,));
        this.points.push(new SAT.Vector(this.r1, this.r1-(this.r1 * CIRCLE_BEZIER_K)));
        this.points.push(new SAT.Vector(this.r1 * CIRCLE_BEZIER_K,this.r1));
        */
    }

    Update(){
        //this.Wander();
        this.xx += this.incrx;
        if(Math.abs(this.xx)>24.0)this.incrx *= - 1;
        this.fur.style.left = this.xx+'px';
        this.elem.style.transform = 'translate('+this.position.x+'px, '+this.position.y+'px)';
        /*
        if(this.collide)
            this.elem.style.background = 'red';//GetColorString(GetRandomColor());
        else
            this.elem.style.background = 'green';//GetColorString(GetRandomColor());
            */
    }
    
    
}

