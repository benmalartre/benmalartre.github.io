const GROUND_PATCH_WIDTH = 2048;
const GROUND_PATCH_HEIGHT = 256;
const GROUND_NUM_PATCHES = 1;
const GROUND_DIVISION = 64;
const GROUND_RANDOM_HEIGHT = 64;

class GroundSlice_t{
    constructor(X, Y, W, H, H1, H2){
        this.points = [];
        this.active = false;
        this.pos = new SAT.Vector(X,Y);
        this.points.push(new SAT.Vector(0, H1));
        this.points.push(new SAT.Vector(W, H2));
        this.points.push(new SAT.Vector(W, H));
        this.points.push(new SAT.Vector(0, H));
        this.entity = new SAT.Polygon(this.pos, this.points);
    }

    Draw(context){
        context.beginPath();
        context.moveTo(this.pos.x + this.points[0].x, this.points[0].y);
            
        for(var i=1;i<4;i++)
        {
            context.lineTo(this.pos.x + this.points[i].x , this.points[i].y );
        }
        context.closePath();
        if(this.active == true) context.fillStyle = GetColorString(GetRandomColor());//'rgba(255,0,0,64)';
        else context.fillStyle = 'rgba(0,255,0,64)';
        context.fill();
        context.stroke();
    }

    Raycast(x){
        var ratio;
        
    
        if((x - this.pos.x)<this.points[0].x) ratio = 1.0;
        else if((x - this.pos.x) > this.points[1].x) ratio = 0.0;
        else ratio = ((x - this.pos.x) - this.points[0].x) / (this.points[1].x - this.points[0].x);
        console.log('PLAYER X : '+ratio);
        return this.points[0].y * (1-ratio) + this.points[1].y * ratio;
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
        for (var i = 0; i < this.totalNumPoints; i++) { this.points.push(new SAT.Vector(0,0))}; 
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
        this.points[0].y = Math.random() * GROUND_RANDOM_HEIGHT + this.height * 0.75;
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
            
        for(var i=1;i<this.totalNumPoints;i++)
        {
            this.points[i].x = i * this.sliceWidth;
            this.points[i].y = Math.random() * GROUND_RANDOM_HEIGHT + this.height * 0.75;
            //context.bezierCurveTo(0, h1*10, 256, (h1+h2)*5+10, 512, h2*10);
            context.lineTo(this.points[i].x , this.points[i].y );

            var slice = new GroundSlice_t(this.points[i-1].x, 0, this.sliceWidth, this.height, this.points[i-1].y, this.points[i].y);
            this.slices.push(slice);
        }

        // feel bottom
        context.lineTo(this.points[this.totalNumPoints-1].x, this.height);
        context.lineTo(0, this.height);
        context.closePath()
        context.fill();
        context.stroke();

        this.elem.style.top = 0;
        this.elem.style.left = 0;
        //this.elem.style.width = this.zoom +'%';
        //this.overlay.style.width = this.zoom +'%';
        
    }

    Activate(playerPos){
        this.actives.length = 0;
        
        this.ratio = this.width  / this.elem.offsetWidth;

        for(var i=0;i<this.slices.length;i++){
            this.slices[i].Deactivate();
            if(playerPos.x  > (this.points[i].x - 1) && playerPos.x < ( this.points[i+1].x + 1)){
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

    }

    Raycast(obj){

        for(var i=0 ; i< this.actives.length;i++)
        {
            var y = this.actives[i].Raycast(obj.position.x);
            obj.position.y = y;
            obj.velocity.y = 0;
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

        for(var i=0;i<this.slices.length;i++)
            if(this.slices[i].active) this.slices[i].Draw(context);
        this.elem.style.left = this.position.x+'px';
    }
}