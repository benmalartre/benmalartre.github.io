"use strict";
var LASTX = 0;
var LASTY = 0;
var OFFSETX = 0;
var OFFSETY = 0;
var DRAG = false;
var NEWX = 0;
var NEWY = 0;

var INFO_SELECT_DATE = 'Choisissez une date :'

function Content_t(elem){
    this.parentElement = elem;
    this.elem = document.createElement('div');
    this.elem.id = 'content_slider';
    this.elem.style.position = 'relative';
    this.elem.style.background = 'black';
    this.elem.style.display = 'block';  
    this.elem.style.width = '100%';
    this.elem.style.height = '100%';
    this.elem.style.touchAction = 'none';
    elem.appendChild(this.elem);

    this.drag = false;
    this.data = null;
    /*
    elem.addEventListener('mousedown', this.OnMouseDown);
    elem.addEventListener('mousemove', this.OnMouseMove);
    elem.addEventListener('mouseup', this.OnMouseUp);

    elem.addEventListener('touchstart', this.OnMouseDown);
    elem.addEventListener('touchmove', this.OnMouseMove);
    elem.addEventListener('touchend', this.OnMouseUp);
    */
};

Content_t.prototype.Update = function() {

    if(this.data)this.data.Update();
}

Content_t.prototype.OnMouseDown = function(ev){
    DRAG = true;
    if(ev.type === 'touchstart'){
        LASTX = ev.touches[0].clientX - OFFSETX;
        LASTY = ev.touches[0].clientY - OFFSETY;
    }
    else{
        LASTX = ev.clientX - OFFSETX;
        LASTY = ev.clientY - OFFSETY;
    }
};

Content_t.prototype.OnMouseUp = function(ev){
    DRAG = false;
    OFFSETX = NEWX;
    OFFSETY = NEWY;
};

Content_t.prototype.OnMouseMove = function(ev){
    ev.preventDefault();
    if(DRAG){
        var win = document.querySelector('#content');
        var elem = document.querySelector('#content_slider');
        if(ev.type === 'touchmove'){
            NEWX = ev.touches[0].clientX - LASTX;
            NEWY = ev.touches[0].clientY - LASTY;
        }
        else{
            NEWX = ev.screenX - LASTX;
            NEWY = ev.screenY - LASTY;
        }
        
        var maxX = -(elem.offsetWidth-win.offsetWidth);
        var maxY = -(elem.offsetHeight-win.offsetHeight)
        if(NEWX > 0)NEWX = 0;
        else if(NEWX<maxX)NEWX = maxX;
        if(NEWY > 0)NEWY = 0;
        else if(NEWY<maxY)NEWY = maxY;

        elem.style.left = NEWX;
        elem.style.top = NEWY;
    }
};

Content_t.prototype.Clear = function(){
    for(var i=this.elem.childNodes.length-1;i>=0;i--){
        this.elem.removeChild(this.elem.childNodes[i]);
    }
};

Content_t.prototype.Mount = function(elem){
    this.elem.appendChild(elem);
    this.elem.style.width = elem.offsetWidth;
    this.elem.style.wheightidth = elem.offsetHeight;
    this.elem.top = '0px';
    this.elem.left = '0px';
};

Content_t.prototype.SetData = function(data){
    this.data = data;
};

Content_t.prototype.Scroll = function(newX, newY){
    this.parentElement.scrollLeft = newX;
    this.parentElement.scrollTop = newY;
};
