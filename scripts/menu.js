"use strict";

var buildMenuCallback=function(menu, data) {
	var descs = JSON.parse(data);
	descs.forEach(function (desc, index) {
		var callback = desc['name'];
		menu.items.push(new MenuItem_t(desc['name'], menu, index, callback));
	});
}

function MenuItem_t(name, parent, id, callback){
	this.elem = document.createElement('a');
	this.text = document.createTextNode(name);
	this.elem.setAttribute('name', name);
	this.elem.setAttribute('href', '#');
	this.elem.addEventListener('click', this.OnClick);
	this.elem.menu_id = id;
	this.elem.callback = callback;
	this.elem.parent = parent;
	parent.elem.appendChild(this.elem);
	this.elem.appendChild(this.text);
}

MenuItem_t.prototype.OnClick = function(event){
	var elem = event.target;
	APP_MODE = elem.menu_id;
	app.SetContent(elem.name);
	elem.parent.active.style.backgroundColor = "transparent";
	elem.parent.active.style.color = "white";
	elem.parent.active = elem;
	elem.style.backgroundColor = "greenyellow";
	elem.style.color = "black";
};

function Menu_t(parent) {
	this.items = [];
	this.elem = parent;
	this.items = new Array();
	loadJSON(this, buildMenuCallback, 'datas/menu.json', false);
	this.active = this.items[0].elem;
	this.active.style.backgroundColor = "greenyellow";
	this.active.style.color = "black";
};