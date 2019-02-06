const DRAWABLE_TYPE_EMPTY = 0;
const DRAWABLE_TYPE_CANVAS = 1;
const DRAWABLE_TYPE_SVG = 2;
const DRAWABLE_TYPE_WEBGL = 3;

class Drawable_t extends Object_t{
    constructor(parent, drawableType, x, y, z, width=32, height=32){

        super(OBJECT_TYPE.OBJECT_DRAWABLE, x, y, z);
        this.parent = parent;
        this.children = [];
        this.drawableType = drawableType;
        switch(drawableType){
          case DRAWABLE_TYPE_CANVAS:
            this.elem = document.createElement('canvas');
            this.elem.width = width;
            this.elem.height = height;
            break;

          case DRAWABLE_TYPE_SVG:
            this.elem = document.createElementNS(SVG_NS, 'svg');
            break;

          case DRAWABLE_TYPE_WEBGL:
            this.elem = document.createElement('webgl');
            break;

          default:
            this.elem = document.createElement('div');
            break;
        }
        
        if(this.elem){
          this.elem.style.position = 'absolute';
          this.elem.style.top = '0px';
          this.elem.style.left = '0px';
          if(this.parent && this.parent.elem)
          {
            this.parent.elem.appendChild(this.elem);
          }
        }
        
    }

    AddChild(child){
      this.children.push(child);
    }

}
