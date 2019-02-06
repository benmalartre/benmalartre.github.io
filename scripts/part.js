const PART_TYPE_TRANSFORM = 0;
const PART_TYPE_CIRCLE = 1;
const PART_TYPE_BOX = 2;
const PART_TYPE_PATH = 3;

class Part_t extends Object_t{
    constructor(parent, partType, x, y, z){
        super(OBJECT_TYPE.OBJECT_PART, x, y, z);
        
        this.parent = parent;
        this.stroked = true;
        this.filled = true;
        this.fill_color = 'rgba(255,255,255,255)';
        this.stroke_color = 'rgba(0,0,0,255)';
        this.children = [];
        switch(partType){
          case PART_TYPE_TRANSFORM:
            break;
          case PART_TYPE_CIRCLE:
            this.elem = document.createElementNS(SVG_NS, 'circle');
            
            this.elem.setAttribute('r', 12); 
            break;
          case PART_TYPE_BOX:
            this.elem = document.createElementNS(SVG_NS, 'rect');
            break;
          default:
            this.elem = document.createElementNS(SVG_NS, 'path');
            break;
        }
        this.elem.fill = 'red';
        this.elem.stroke = 'black';
        this.elem.setAttribute('stroke_type', 12); 
        this.parent.AddChild(this);
        if(this.parent && this.parent.elem && this.elem)
        {
          this.parent.elem.appendChild(this.elem);
          this.elem.style.transform = 'translate('+x+'px'+y+'px)';
        }
    }

    SetFilled(value){
      this.filled = value;
      if(this.filled && this.elem)
      this.elem.setAttribute('fill', GetColorString(this.fill_color)); 
    }

    SetFillColor(color){
      if(this.elem)this.elem.style.fill = GetColorString(color);
    }

    SetStroked(value){
      this.stroked = value;
      if(this.stroked && this.elem) this.elem.setAttribute('stroke_type', value); 
    }

    SetStrokeColor(color){
      if(this.elem)this.elem.style.stroke_color = GetColorString(color);
    }

    SetRadius(r){
      if(this.elem)this.elem.setAttribute('r', r);
    }

    SetPath(points){
      var datas = "M "+points[0].x+" "+points[0].y;
      for(var i=1;i<points.length;i++){
        datas += " L "+points[i].x+" "+points[i].y;
      }
      this.elem.setAttribute('d', datas); 
    }

    Update(){
      var t = Math.sin(new Date().getTime()*0.001)
      this.elem.style.transform = 'translate('+this.position.x+'px, '+this.position.y+'px) scale(1,'+t+')';
    }
}