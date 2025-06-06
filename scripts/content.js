"use strict";

function Content_t(parent){
    this.parentElement = parent;
    this.elem = document.createElement('div');
    this.elem.style.position = 'fixed';
    this.elem.style.background = 'black';
    this.elem.style.display = 'block';  
    this.elem.style.width = '100%';
    this.elem.style.height = '100%';
    this.elem.style.zIndex = 5;
    parent.appendChild(this.elem);

    this.objects = new Array();
    this.speedMs = 100;
    this.then = 0;
    this.now = 0;

    requestAnimationFrame(() => this.Update());
};

Content_t.prototype.Update = function() { 
    // calc elapsed time since last loop
    this.now = Date.now();
    let elapsed = this.now - this.then;

    if (elapsed > this.speedMs) {
        this.then = this.now;

        for(var i=0; i < this.objects.length; i++) {
        /*if(this.objects[i].needUpdate)*/this.objects[i].Update();
      }
    }

    requestAnimationFrame(() => this.Update());
}

Content_t.prototype.Clear = function(){
    for(var i=this.elem.childNodes.length-1;i>=0;i--){
        this.elem.removeChild(this.elem.childNodes[i]);
    }
    this.objects = new Array();
    this.pause = true;
};

Content_t.prototype.Mount = function(content){   
    this.elem.appendChild(content.elem);
    this.elem.style.position = 'relative';
    this.elem.style.top = '0px';
    this.elem.style.left = '0px';
    this.elem.style.width = '100%';
    this.elem.style.height = '100%';
    this.objects.push(content);
};
