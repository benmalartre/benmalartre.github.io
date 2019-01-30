const SVG_NS = 'http://www.w3.org/2000/svg';
class Mask_t{
    constructor(parent, elem, points){
        var svg = parent.appendChild(document.createElementNS(SVG_NS, 'svg'));
        var path = svg.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
        path.id = 'clippy';
        
        var datas = this.GetPath(points);
        if(datas != ''){
            var m = path.appendChild(document.createElementNS(SVG_NS, 'path'));
            //m.setAttribute('d', 'M 0,0 Q 17.673,0 17.673,14.326 32,32 Q 32,49.673 17.673,64 0,64');
            //M 0,0 Q 17.673,0 32,14.326 32,32 Q 32,49.673 32,64 17.673,64 z
            m.setAttribute('d', datas);
            /*
            m.setAttribute( 'd', 'M 10,30\
                            A 20,20 0,0,1 50,30\
                            A 20,20 0,0,1 90,30\
                            Q 90,60 50,90\
                            Q 10,60 10,30 z');
            */
            elem.style.clipPath = 'url(#clippy)';
            /*
            m.setAttribute('width', '24');
            m.setAttribute('height', '24');
            */
        }
        
        
    }

    GetPath(points){
        var numBezierSegments = ((points.length) - 1)/3;
        if(Math.abs(numBezierSegments)-Math.floor(numBezierSegments)>0.1){
            alert("[MASK] Invalid Num Points");
            return '';
        }
        else{
            var d = 'M '+points[0].x+','+points[0].y+' ';
            var b = 1;
            for(var s=0; s<numBezierSegments;s++){
                d += 'C ';
                for(var p=0;p<3;p++){
                    d += points[b+p].x+','+points[b+p].y+' '
                }
                b += 3;
            }
            d += 'z';           // close path
            console.log(d);
            return d;
        }
    }


}