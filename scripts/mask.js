const SVG_NS = 'http://www.w3.org/2000/svg';

class Mask_t extends Drawable_t{
    
    constructor(parent, elem, url){
        super(parent,DRAWABLE_TYPE_SVG,0,0,0)
        this.clipPath = this.elem.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
        var uid = ID();
        this.uid = uid;
        this.clipPath.id = 'clip'+uid;
        this.active = true
        this.elem = elem;
        var readSVGCallback = function(e){
            var result = e.target.result;
            var s = result.indexOf(' d="');
            var e = result.indexOf('"',s+4);
            var datas = result.substr(s+4, e - (s+4) );
            var path = document.getElementById('clip'+uid);
            var m = path.appendChild(document.createElementNS(SVG_NS, 'path'));
            m.setAttribute('d', datas);
            elem.style.clipPath = 'url(#clip'+uid+')';

        }
        AcquireFile(url, readSVGCallback, FILE_MODE_TEXT);
    }

    Activate(){
        this.elem.style.clipPath = 'url(#clip'+this.uid+')';
    }
    Dactivate(){
        this.elem.style.clipPath = '';
    }

    FromPoints(points){
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
            return d;
        }
    }

    FromSVG(url){

    }



}