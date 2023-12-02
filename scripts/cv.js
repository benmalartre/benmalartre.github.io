"use strict";

var buildCVCallback=function(cv, data) {
	var descs = JSON.parse(data);
	console.log(descs);
	descs.forEach(function (desc, index) {
		var callback = desc['key'];
		var item = new CVItem_t(desc['key'], cv, index, callback);
		cv.items.push(item);
		cv.numEntries ++;
	});
}

function CVItem_t(name, parent, id, callback){
	this.elem = document.createElement('section');
    this.place = document.createElement('div');
    this.place.setAttribute('id', 'place');
    this.place.setAttribute('innerHtml', 'zob');
    /*
	this.text = document.createTextNode(name);
    */
	this.elem.setAttribute('name', name);
	this.elem.setAttribute('href', '#');
    
	this.elem.addEventListener('click', this.OnClick, false);
    
	this.elem.menu_id = id;
	this.elem.callback = callback;
	this.elem.parent = parent;

    this.elem.appendChild(this.place);
    parent.elem.appendChild(this.elem);
    alert(name);
	
}

CVItem_t.prototype.OnClick = function(event){
	var cvItem = event.target;
	var cvParent = cvItem.parent;
	var id = event.target.menu_id;

    alert('menu clicked!!!');
    alert(id);
};

function CV_t(parent) {
	this.numEntries = 0;
	this.items = new Array();
	this.elem = document.createElement('div');
    this.elem.id = 'content';
	loadJSON(this, buildCVCallback, 'datas/cv.json', true);
};