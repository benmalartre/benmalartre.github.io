const ANIM_NONE = 0
const ANIM_SCALE = 1
const ANIM_ROTATE = 2
const ANIM_TRANSLATE = 4
const ANIM_SHEAR = 8

class Animation_t{
    constructor(obj, startTransform, endTransform, duration){
        this.obj = obj;
        this.startTransform = startTransform;
        this.endTransform = endTransform;
        this.duration = duration;
        this.begin = 0;
        this.T = new Date();
    }

    SetStartTransform(startTransform){
        this.startTransform = startTransform;
    }

    SetEndTransform(endTransform){
        this.endTransform = endTransform;
    }

    SetDuration(duration){
        this.duration = duration;
    }

    Start(){
        this.begin = this.T.getTime();
        this.obj.elem.setAttribute('transform', 'matrix('+this.startTransform.globalT.v+')');
    }

    Stop(){
        this.obj.elem.setAttribute('transform', 'matrix('+this.endTransform.globalT.v+')');
    }

    Update(){
        var blend = this.duration / ((this.T.getTime() - this.begin)*0.001);
        if(blend>1.0) stop();
        else{
            var interpolated = InterpolateTransform(this.startTransform, this.endTransform, blend);
            this.obj.elem.setAttribute('transform', 'matrix('+interpolated.globalT.v+')');
        }
    }
}