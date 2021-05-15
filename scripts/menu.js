"use strict";
const MENU_ITEMS = {	'0':{name: 'softimage', label: 'Softimage', type:'text/script'},
						'1':{name: 'maya',      label: 'Maya',      type:'text/script'},
						'2':{name: 'usd',       label: 'USD',       type:'text/script'},
						'3':{name: 'cpp',       label: 'C++',       type:'text/script'}};

var NUM_MENU_ENTRIES = 0;				
var MENU_NUM_CHAR = 1;
for(var i in MENU_ITEMS){
	MENU_NUM_CHAR += (MENU_ITEMS[i]['label'].length+1);
	NUM_MENU_ENTRIES++;
};

function OnMenuClicked(name){
    console.log('CLICKED : '+name);
	app.SetContent(name);
};

function OnMenuResize(){
	var menu = document.querySelector('#menu');
	var a = menu.querySelectorAll('a');
	if(menu.offsetWidth>menu.offsetHeight){
		var s = menu.offsetWidth / MENU_NUM_CHAR;
		for(var i=0;i<a.length;i++){
			a[i].style.display = 'inline';
			a[i].style.fontSize = 2*s+'px';
		}
	}
	else{
		var s = menu.offsetWidth / (MENU_NUM_CHAR / NUM_MENU_ENTRIES);
		for(var i=0;i<a.length;i++){
			a[i].style.display = 'block';
			a[i].style.fontSize = s+'px';
		}
	}
};

function MenuItem_t(name, parent, id, callback, args){
	this.elem = parent.querySelector('a[name="'+name+'"]');
	this.elem.addEventListener('click', this.OnClick, false);
	this.elem.menu_id = id;
	this.elem.callback = callback;
	this.elem.args = args;
}

MenuItem_t.prototype.OnClick = function(event){
	var callback = event.target.callback;
	var args = event.target.args;
	var id = event.target.menu_id;
	APP_MODE = id;
	if(callback){
		if(args) executeFunctionByName(callback, window, args);
		else executeFunctionByName(callback, window);
	}
};

function Menu_t(parent){
	this.items = new Array();
	this.elem = parent;
	var keys = Object.keys(MENU_ITEMS);
	for(var i=0;i<keys.length;i++){
		var callback = 'OnMenuClicked';
		var args = [MENU_ITEMS[keys[i]]['name']];
		var item = new MenuItem_t(MENU_ITEMS[keys[i]]['name'], this.elem, i, callback, args, MENU_ITEMS[keys[i]]['type']);
	
		this.elem.appendChild(item.elem);
		
		this.items.push(item);
	}
};