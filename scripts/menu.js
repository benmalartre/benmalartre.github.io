"use strict";

var buildMenuCallback=function(menu, data) {
	var descs = JSON.parse(data);
	var items = [];
	descs.forEach(function (desc, index) {
		var callback = desc['name'];
		items.push(new MenuItem_t(desc['name'], menu, index, callback));
	});
	return items;
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
	var menuItem = event.target;
	APP_MODE = menuItem.menu_id;
	app.SetContent(menuItem.name);
	menuItem.parent.active.elem.style.backgroundColor = "transparent";
	menuItem.parent.active = menuItem;
	menuItem.elem.style.backgroundColor = "greenyellow";
};

function Menu_t(parent) {
	this.items = [];
	this.elem = parent;
	this.items = loadJSON(this, buildMenuCallback, 'datas/menu.json', true);
	this.active = this.items[0];
	this.active.elem.style.backgroundColor = "greenyellow";
};