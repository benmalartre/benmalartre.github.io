"use strict";

var buildMenuCallback=function(menu, data) {
	var descs = JSON.parse(data);
	descs.forEach(function (desc, index) {
		var callback = desc['name'];
		var item = new MenuItem_t(desc['name'], menu, index, callback);
		menu.items.push(item);
		menu.numEntries ++;
		menu.numChars += desc['label'].length + 1;
	});
}

function MenuItem_t(name, parent, id, callback){
	this.elem = document.createElement('a');
	this.text = document.createTextNode(name);
	this.elem.setAttribute('name', name);
	this.elem.setAttribute('href', '#');
	this.elem.classList.add('active');
	this.elem.addEventListener('click', this.OnClick);
	this.elem.menu_id = id;
	this.elem.callback = callback;
	this.elem.parent = parent;
	parent.elem.appendChild(this.elem);
	this.elem.appendChild(this.text);
}

MenuItem_t.prototype.OnClick = function(event){
	console.log(this);
	var menuItem = event.target;
	this.classList.toggle('active');
	APP_MODE = event.target.menu_id;
	app.SetContent(menuItem.name);
};

function Menu_t(parent) {
	this.numChars = 0;
	this.numEntries = 0;
	this.items = new Array();
	this.elem = parent;
	loadJSON(this, buildMenuCallback, 'datas/menu.json', true);
	this.active = this.items[0];
};