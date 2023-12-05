"use strict";

function Content_t(parent){
    this.parentElement = parent;
    this.elem = document.createElement('div');
    this.elem.id = 'content_slider';
    this.elem.style.position = 'relative';
    this.elem.style.background = 'black';
    this.elem.style.display = 'block';  
    this.elem.style.width = '100%';
    this.elem.style.height = '100%';
    this.elem.style.touchAction = 'none';
    parent.appendChild(this.elem);

    this.objects = new Array();
};

Content_t.prototype.Update = function() {
    for(var i=0; i < this.objects.length; i++) {
        this.objects[i].Update();
    }
}

Content_t.prototype.Clear = function(){
    for(var i=this.elem.childNodes.length-1;i>=0;i--){
        this.elem.removeChild(this.elem.childNodes[i]);
    }
};

Content_t.prototype.Mount = function(content){   
    this.elem.appendChild(content.elem);
    this.elem.style.width = content.elem.offsetWidth;
    this.elem.style.height = content.elem.offsetHeight;
    this.elem.top = '0px';
    this.elem.left = '0px';
    this.objects.push(content);
};
