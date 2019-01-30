const PINGU_NUM_POINTS = 32

class Pingu_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.OBJECT_PLAYER, x, y, z, 0);

        this.elem.style.background = 'black';
        

        var svgNS = 'http://www.w3.org/2000/svg';

        this.svg = document.createElementNS(svgNS, 'svg');
        this.mask = document.createElementNS(svgNS, 'clipPath');
        this.mask.url = 'svg/pinguin.svg';
        this.mask.id = 'svgPath';
        this.mask.fill = '#FFFFFF';
        this.mask.stroke = '#000000';
 
        this.mask.d = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        /*
        this.mask.d = 'M215,100.3c97.8-32.6,90.5-71.9,336-77.6\
        c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,\
        178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,\
        20.1c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z');
        */

        this.body = document.createElement('div');
        this.elem.appendChild(this.body);

        this.body.style.position = 'relative';
        this.body.style.width = '50%';
        this.body.style.height = '50%';
        this.body.style.top = '25%';
        this.body.style.left = '25%';
        this.body.style.border = 'red dotted 7px';
        //this.body.display = 'inline-block';

        this.body.style.background = 'rgba(255,128,58,64)';
        this.body.style.clipPath = this.mask;//'polygon(50% 0%, 0% 100%, 100% 100%)';;
        
        //this.elem.appendChild(this.svg);
        /*
        this.mask.id = 'svgPath';
        this.mask.fill = '#FFFFFF';
        this.mask.stroke = '#000000';
        this.mask.stroke_width = 2;
        this.mask.d = 'M215,100.3c97.8-32.6,90.5-71.9,336-77.6\
        c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,\
        178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,\
        20.1c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z';
        */
        console.log('MASK : '+this.mask);
        console.log('SVG : '+this.svg);



        /*
        this.body = document.createElement('canvas');
        this.body.width = 128;
        this.body.height = 128;



        
        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttributeNS(null, 'x', '0');
        rect.setAttributeNS(null, 'y', '0');
        rect.setAttributeNS(null, 'width', '200');
        rect.setAttributeNS(null, 'height', '100');
        clippath.appendChild(rect);
        */

        //this.elem.style.clipPath = "polygon(0 0,50% 100%, 100% 0)";
        //url(#svgPath)
        //this.elem.style.clipPath = 'url("svg/pinguin.svg")' ;
        //this.elem.style.background = 'white';
        this.elem.style.width = '128px';
        this.elem.style.height = '128px';
        //this.elem.appendChild(this.svg);
        //clippath.appendChild(this.body);
        //this.elem.appendChild(this.body);
        this.mass = 10.0;
        this.points = [];
        this.r1 = 32;
        this.r2 = 24;
        this.h = 64;
        this.w = 32;
        this.position.x = 64;
        this.position.y = 32;
    
        //<img src="green-circle.svg" height="64" alt="Nice green circle"/>
        //this.Points();
        this.Draw();
        this.Update();
    }

    Fur(context){
        for(var i=0;i<12;i++)
        {
            context.fillStyle = GetColorString(GetRandomColor());
            //context.circle(Math.random()*this.width, Math.random()*this.height);
        }
    }

    Points(){
        var x=0.0;
        var y=0.0;
        this.points = [];
        var step = (360 / PINGU_NUM_POINTS) * DEGTORAD;
        var a=0.0;
        var clipPath = 'url("svg/pinguin.svg")';
        /*
        var clipPath = 'polygon(';

        for(var i=0;i<PINGU_NUM_POINTS;i++)
        {
            a = i* step;
            x = 32 + this.r1 * Math.cos(a)+Math.random();
            y = (32 + this.r1 * Math.sin(a)+Math.random())*2;
            clipPath += x +'px '+ y+'px';
            if(i<PINGU_NUM_POINTS-1)clipPath+=',';
            else clipPath+=')';
            console.log(clipPath);
            this.points.push(new SAT.Vector(x,y));
        }
        */
        this.elem.style.clipPath = clipPath;
    }
        
    Init(){

    }

    Draw(){
        //var context = this.elem.context
        /*
        var context = this.body.getContext( '2d' );
        // plain it in white
        this.elem.width = 512;
        this.elem.height = 512;
        context.fillStyle    = '#ffff3f';
        context.fillRect( 0, 0, this.elem.width-20, this.elem.height-20 );
        this.Fur(context);
        */
    }

    Jump(){
        if(this.grounded){
            this.force.y -= 150;
            this.grounded = false;
        }
    }

    Update(){
        //this.Wander();
        this.elem.style.transform = 'translate('+this.position.x+'px, '+this.position.y+'px)';
        /*
        if(this.collide)
            this.elem.style.background = 'red';//GetColorString(GetRandomColor());
        else
            this.elem.style.background = 'green';//GetColorString(GetRandomColor());
        */
    }
    
    
}

