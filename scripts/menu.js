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
	menu.OnMenuResize();
}

function MenuItem_t(name, parent, id, callback){
	this.elem = document.createElement('a');
	this.text = document.createTextNode(name);
	this.elem.setAttribute('name', name);
	this.elem.setAttribute('href', '#');
	this.elem.addEventListener('click', this.OnClick, false);
	this.elem.menu_id = id;
	this.elem.callback = callback;
	this.elem.parent = parent;
	parent.elem.appendChild(this.elem);
	this.elem.appendChild(this.text);
}

MenuItem_t.prototype.OnClick = function(event){
	var menuItem = event.target;
	var menuParent = menuItem.parent;
	var id = event.target.menu_id;
	APP_MODE = id;

	if(menuItem.id != menuParent.active) {
		menuParent.active = menuItem.id;
		menuItem.classList.toggle('active');
	}
	app.SetContent(menuItem.name);
};

function Menu_t(parent) {
	this.numChars = 0;
	this.numEntries = 0;
	this.items = new Array();
	this.elem = parent;
	this.Active = -1;
	loadJSON(this, buildMenuCallback, 'datas/menu.json', true);
};