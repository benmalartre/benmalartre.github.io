class Wire_t extends Passive_t{
    constructor(x1, y1, x2, y2){
        super(OBJECT_TYPE.BACKGROUND, (x1 + x2)*0.5, (y1 + y2)*0.5, 0);
        this.elem.style.width = '512px';
        this.elem.style.height = '512px';
        this.elem.style.color = 'white';
        //this.elem.style.background = 'green';
        this.elem.style.top = '0px';
        this.elem.style.left = '0px';

    }

    Init(){
        var context = this.elem.getContext( '2d' );
        // plain it in white
        this.elem.width = 512;
        this.elem.height = 512;
        //context.fillStyle    = '#ffffff';
        //context.fillRect( 0, 0, 64, 64 );
        context.strokeStyle = '#000000';
        var h1, h2;
        for(var i=0; i<12;i++)
        {
            h1 = Math.random(16)-32 + 64;
            h2 = Math.random(16)-32 + 64;
            context.beginPath();
            context.moveTo(0, h1);
            context.bezierCurveTo(0, h1*10, 256, (h1+h2)*5+10, 512, h2*10);
            context.stroke();
        }
        
        
        // draw the window rows - with a small noise to simulate light variations in each room
        for( var y = 0; y < 32; y += 2 ){
            for( var x = 0; x < 64; x += 2 ){
                var value   = Math.floor( Math.random() * 64 );
                context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
                context.fillRect( x, y, 1, 1 );
            }
        }

        this.elem.style.width = '100%';
        this.elem.style.height = '100%';
        
    }

    Update(){
        
    }
    
    
}

