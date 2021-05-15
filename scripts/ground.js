const GROUND_PATCH_WIDTH = 4096;
const GROUND_PATCH_HEIGHT = 512;
const GROUND_NUM_PATCHES = 1;
const GROUND_DIVISION = 16;
const GROUND_RANDOM_HEIGHT = 16;
const GROUND_SLICE_DEPTH = 64;
const GROUND_SLICE_SHEAR = -64;

var GROUND_STATE  = {
    DEFAULT: 0,
    NEAR: 1,
    OVER: 2,
    HIT: 3
};

class GroundSlice_t{
    constructor(A, B){
        this.points = [];
        this.active = false;
        var X = A.x;
        var Y = GROUND_PATCH_HEIGHT;
        var H1 = A.y;
        var H2 = B.y;
        var W = B.x - A.x;

        this.pos = new SAT.Vector(X,Y);
        this.Z1 = A.z;
        this.Z2 = B.z;
        this.points.push(new SAT.Vector(0, H1 + A.z));
        this.points.push(new SAT.Vector(W, H2 + B.z));
        this.points.push(new SAT.Vector(W, GROUND_PATCH_HEIGHT));
        this.points.push(new SAT.Vector(0, GROUND_PATCH_HEIGHT));
        this.entity = new SAT.Polygon(this.pos, this.points);
    }

    Draw(context){
        context.beginPath();
        context.moveTo(this.pos.x + this.points[0].x, this.points[0].y);
        var last = this.points.length - 1;
        for(var i=1;i<4;i++)
        {
            context.lineTo(this.pos.x + this.points[i].x , this.points[i].y );
        }
        
        if(this.active == true) context.fillStyle = GetColorString(GetRandomColor());//'rgba(255,0,0,64)';
        else context.fillStyle = 'rgba(0,255,0,64)';
        context.fill();
        context.stroke();
    }

    GetZeroZ(x){
        var ratio;

        if((x - this.pos.x)<this.points[0].x) ratio = 0.0;
        else if((x - this.pos.x) > this.points[1].x) ratio = 1.0;
        else ratio = ((x - this.pos.x) - this.points[0].x) / (this.points[1].x - this.points[0].x);
        
        return (this.Z1 * (1-ratio) + this.Z2 * ratio);
    }

    Raycast(x, z, p){
        var ratio;

        if((x - this.pos.x)<this.points[0].x) ratio = 0.0;
        else if((x - this.pos.x) > this.points[1].x) ratio = 1.0;
        else ratio = ((x - this.pos.x) - this.points[0].x) / (this.points[1].x - this.points[0].x);
        
        var min_z = (this.points[0].y * (1-ratio) + this.points[1].y * ratio) - GROUND_SLICE_DEPTH * 0.5;
        var max_z = (this.points[0].y * (1-ratio) + this.points[1].y * ratio) + GROUND_SLICE_DEPTH * 0.5;
        
        if(z<min_z || z>max_z)return false;
        
        p.y = this.points[0].y * (1-ratio) + this.points[1].y * ratio + z;
        return true;
    }

    Update(A, B, zoom=1.0, offsetx=0.0, offsety=0.0){
        this.pos.x = A.x;
        this.pos.y = 0;

        this.points[0].x = 0;
        this.points[0].y = A.y;

        this.points[1].x = B.x - A.x;
        this.points[1].y = B.y;

        this.points[2].x = B.x - A.x;
        this.points[2].y = A.y;

        this.points[3].x = 0;
        this.points[3].y = A.y;

        this.points.push(new SAT.Vector(W, H2));
        this.points.push(new SAT.Vector(W, H));
        this.points.push(new SAT.Vector(0, H));
        this.entity = new SAT.Polygon(this.pos, this.points);
    }

    Activate(){ this.active = true;};
    Deactivate(){ this.active = false;};
}

class Ground_t extends Passive_t{
    constructor(){
        
        super(OBJECT_TYPE.OBJECT_GROUND, 0,0,GROUND_PATCH_WIDTH, GROUND_PATCH_HEIGHT);
        this.overlay = document.createElement('canvas');
        this.overlay.style.position = 'absolute';
        this.overlay.style.display = 'inline-block';
        this.overlay.style.zIndex = 99;
        this.overlay.width = GROUND_PATCH_WIDTH;
        this.overlay.height = GROUND_PATCH_HEIGHT;
        this.ratio = 1.0;
        this.sliceWidth = GROUND_PATCH_WIDTH / GROUND_DIVISION;
        document.getElementById('GameContainer').appendChild(this.overlay);

        this.elem.style.border = '1px orange dotted';
        this.totalNumPoints = (GROUND_DIVISION+1) * GROUND_NUM_PATCHES;
        this.width = GROUND_PATCH_WIDTH;
        this.height = GROUND_PATCH_HEIGHT; 
        this.zoom = 100;
        this.points = [];
        for (var i = 0; i < this.totalNumPoints; i++){this.points.push(new Point_t(0,0,0));};
        this.slices = [];
        this.actives = [];
        this.Init();
    }

    Init(){
        
        var context = this.elem.getContext( '2d' );
        
        context.strokeStyle = '#ffffff';
        context.fillStyle = GetColorString(GetRandomColor());

        this.sliceWidth = this.width / GROUND_DIVISION;
        this.points[0].x = 0;
        this.points[0].y = GROUND_PATCH_HEIGHT * 0.5;// Math.random() * GROUND_RANDOM_HEIGHT + this.height * 0.25;
        this.points[0].z = 0;//Math.random()*32 - 64;
        //context.beginPath();
        //context.moveTo(this.points[0].x + GROUND_SLICE_SHEAR, this.points[0].y + GROUND_SLICE_DEPTH);
        var last = this.points.length - 1; 
        var amp = 128;
        var freq = 0.5;
        for(var i=1;i<this.totalNumPoints;i++)
        {
            this.points[i].x = i * this.sliceWidth;
            this.points[i].y = GROUND_PATCH_HEIGHT *0.5 + Math.sin(i*freq) * amp;//Math.random() * GROUND_RANDOM_HEIGHT + this.height * 0.25 + Math.sin(i*freq) * amp;
            this.points[i].z = 0;//Math.random()*32 - 64;
            //context.bezierCurveTo(0, h1*10, 256, (h1+h2)*5+10, 512, h2*10);
            //context.lineTo(this.points[i].x + GROUND_SLICE_SHEAR, this.points[i].y + GROUND_SLICE_DEPTH);
            context.beginPath();
            context.moveTo(this.points[i-1].x + GROUND_SLICE_SHEAR * 0.5, this.points[i-1].y + this.points[i-1].z + GROUND_SLICE_DEPTH * 0.5);
            context.lineTo(this.points[i].x + GROUND_SLICE_SHEAR*0.5, this.points[i].y + this.points[i].z + GROUND_SLICE_DEPTH * 0.5);
            context.lineTo(this.points[i].x - GROUND_SLICE_SHEAR * 0.5, this.points[i].y + this.points[i].z - GROUND_SLICE_DEPTH * 0.5);
            context.lineTo(this.points[i-1].x - GROUND_SLICE_SHEAR * 0.5, this.points[i-1].y + this.points[i-1].z - GROUND_SLICE_DEPTH * 0.5);
            context.closePath();
            context.fillStyle = GetColorString(GetRandomColor());
            context.fill();

            var slice = new GroundSlice_t(this.points[i-1], this.points[i]);
            this.slices.push(slice);
        }

        /*
        context.lineTo(this.points[last].x , this.points[last].y);
        for(var i=this.totalNumPoints-2;i>=0;i--)
        {
            context.lineTo(this.points[i].x , this.points[i].y );
        }
        */
        // feel bottom
        //context.lineTo(this.points[this.totalNumPoints-1].x, this.height);
        //context.lineTo(0, this.height * 0.25);
        //context.closePath()
        //context.fill();
        //context.stroke();

        this.elem.style.top = 0;
        this.elem.style.left = 0;
        //this.elem.style.width = this.zoom +'%';
        //this.overlay.style.width = this.zoom +'%';
        
    }

    GetActive(x){
        for(var i=0;i<this.actives.length;i++){
            
            if(x>=this.actives[i].pos.x + this.actives[i].points[0].x && x<this.actives[i].pos.x+this.actives[i].points[1].x)
            {
                return this.actives[i];
            }   
        }
        return null;
    }

    Activate(min_p, max_p){
        this.actives.length = 0;
        
        this.ratio = this.width  / this.elem.offsetWidth;
        for(var i=0;i<this.slices.length;i++){
            this.slices[i].Deactivate();
            if(this.points[i+1].x >= min_p.x - this.position.x && this.points[i].x <= max_p.x - this.position.x)
            {
                this.actives.push(this.slices[i]);
                this.slices[i].Activate();
            }   
            
            /*
            if(playerPos.x * this.ratio > (this.points[i].x - this.position.x - 128) && playerPos.x * this.ratio < ( this.points[i+1].x - this.position.x + 128)){
                this.actives.push(this.slices[i]);
                this.slices[i].Activate();
                
            }   
            */
        }
        console.log('num actives : '+this.actives.length);
    }

    GetZeroZ(obj){
        var active = this.GetActive((obj.position.x + obj.cog.x)-this.position.x);
        return active.GetZeroZ((obj.position.x + obj.cog.x)-this.position.x);
    }
    Outside(z){

    }

    Raycast(obj){

        var active = this.GetActive((obj.position.x + obj.cog.x)-this.position.x);
        var p = new SAT.Vector();
        if(active){
            if(active.Raycast((obj.position.x + obj.cog.x)-this.position.x, obj.Z, p))
            {
                obj.position.y = p.y + obj.Z - PLAYER_HEIGHT;
                obj.velocity.y = 0;
            }
            
        }

    }

    Collide(obj, gravity){
        var hit = false;
        var response = new SAT.Response();

        for(var i=0 ; i< this.actives.length;i++)
        {
            /*
            if(obj.entity instanceof SAT.Circle)
                hit = SAT.testCirclePolygon(obj.entity, this.actives[i].entity, response);
            else
                hit = SAT.testPolygonPolygon(obj.entity, this.actives[i].entity, response);
            */
           hit = SAT.testCirclePolygon(obj.entity, this.actives[i].entity, response);
            if(hit)
            {
                //f(response.overlapN.y > 0)
                if(!obj.grounded){
                    obj.grounded = true;
                    obj.force.y *= -1;
                }

                obj.force.sub(response.overlapN);
                obj.entity.pos.sub(response.overlapN);

                //obj.position.x -= response.overlapV.x;
                //obj.position.y -= response.overlapV.y;
                //
                /*
                obj.position.x += response.overlapV.x;
                obj.position.y += response.overlapV.y;
                
                if (this.isSolid && other.isSolid &&
                    !(this.isHeavy && other.isHeavy)) {
                    if (this.isHeavy) {
                      // Move the other object out of us
                      other.data.pos.add(response.overlapV);
                    } else if (other.isHeavy) {
                      // Move us out of the other object
                      this.data.pos.sub(response.overlapV);
                    } else {
                      // Move equally out of each other
                      response.overlapV.scale(0.5);
                      this.data.pos.sub(response.overlapV);
                      other.data.pos.add(response.overlapV);
                    }
                  }
                */
            }
            else obj.grounded = false;

        }
    }

    Update(){
        var context = this.overlay.getContext( '2d' );
        context.clearRect(0, 0, this.width, this.height);
        context.globalCompositeOperation = 'lighter';
        this.position.x -= 1;
        for(var i=0;i<this.slices.length;i++)
            if(this.slices[i].active) this.slices[i].Draw(context);
        this.elem.style.left = this.position.x+'px';
        this.overlay.style.left = this.position.x+'px';
        
    }
}