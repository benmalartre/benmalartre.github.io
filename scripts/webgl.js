class WebGL_t{
    constructor(parent, x, y, width, height){
        var elem = document.createElement('canvas');
        elem.id = 'webgl_canvas';

        elem.style.top  = x+'px';
        elem.style.left = y+'px';
        elem.width = width;
        elem.height = height;

        if(parent) parent.appendChild(elem);
        else document.body.appendChild(elem);
    }

    InitGL(){
        var gl;
        try{
            gl = this.elem.getContext('webgl');
            gl.viewportWidth = this.elem.width;
            gl.viewportHeight = this.elem.height;
        }catch(e){
            alert('FAIL INIT WEBGL : '+e);
        }
    }
}