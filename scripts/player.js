const CIRCLE_BEZIER_K = 0.552284749831; //4*(sqrt(2)-1)/3
const PLAYER_WIDTH = 92;
const MAX_TURN = 46;
const PLAYER_HEIGHT = 164;

class Player_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.OBJECT_PLAYER, x, y, z, 0);
        
        this.srt = new Drawable_t(this, DRAWABLE_TYPE_EMPTY, 0,0,0,PLAYER_WIDTH, PLAYER_HEIGHT);
        this.body = new Drawable_t(this.srt, DRAWABLE_TYPE_EMPTY, 0,0,0,PLAYER_WIDTH, PLAYER_HEIGHT);
        this.fur = new Drawable_t(this.body, DRAWABLE_TYPE_CANVAS, 0,0,0,PLAYER_WIDTH*2, PLAYER_HEIGHT);
        this.cog.x = PLAYER_WIDTH * 0.5;
        this.cog.y = PLAYER_HEIGHT *0.75;

        var hw = this.fur.elem.width * 0.5;
        var cx = hw * 0.5;
        
        this.face = new Drawable_t(this.srt, DRAWABLE_TYPE_SVG, hw, 0, 0, 0, 64);

        this.l_eye = new Part_t(this.face, PART_TYPE_CIRCLE, cx-12 , 40, 0);
        this.l_eye.SetFillColor(new Color(64,122,180,255));
        this.l_eye.SetFilled()
        this.l_eye.SetRadius(7);
    
        this.r_eye = new Part_t(this.face, PART_TYPE_CIRCLE, cx+12 , 40, 0);
        this.r_eye.SetFillColor(new Color(64,122,180,255));
        this.r_eye.SetFilled()
        this.r_eye.SetRadius(7);
        
        //this.face.Draw();

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
        this.turn = 0;
        this.Init();
    }


    Init(){
        var context = this.fur.elem.getContext( '2d' );
        //context.globalCompositeOperation ="source-over";
        context.fillStyle = 'white';
        context.fillRect(0,0,PLAYER_WIDTH*2, PLAYER_HEIGHT);

        for(var i=0;i<256;i++){
            context.beginPath();
            context.arc(Math.random()*PLAYER_WIDTH, Math.random()*PLAYER_HEIGHT, Math.random()*12+6, 0, 2 * Math.PI);
            context.fillStyle = GetColorString(GetRandomColor());
            context.fill();
        }

        this.mask =  new Mask_t(this.body, this.fur.elem, 'svg/pinguinX.svg');

    }

    Jump(){
        if(this.grounded){
            this.force.y -= 150;
            this.grounded = false;
        }
    }

    Left(){
        this.turn -= 1;
        if(Math.abs(this.turn)>MAX_TURN)this.turn = -MAX_TURN;
        else{
            this.body.position.x -= 1;
            this.mask.position.x += 1;
            this.Update();
        }
        
    }

    Right(){
        this.turn += 1;
        if(this.turn>MAX_TURN)this.turn = MAX_TURN;
        else{
            this.body.position.x += 1;
            this.mask.position.x -= 1;
            this.Update();
        }
    }

    Update(){
        //this.Wander();
        this.xx += this.incrx;
        if(Math.abs(this.xx)>24.0)this.incrx *= - 1;
        this.body.elem.style.border = 'black 1px dotted';
        this.body.elem.style.transform = 'translate('+this.body.position.x+'px, 0px)';
        //this.mask.elem.style.border = 'green 1px dotted';
        this.mask.clipPath.setAttribute('transform','translate('+this.mask.position.x+',0)');
        this.srt.elem.style.transform = 'translate('+this.position.x+'px, '+(this.position.y+this.Z)+'px)';

        this.l_eye.Update();
        this.r_eye.Update();
        /*
        if(this.collide)
            this.elem.style.background = 'red';//GetColorString(GetRandomColor());
        else
            this.elem.style.background = 'green';//GetColorString(GetRandomColor());
        */
    }
    
    
}

