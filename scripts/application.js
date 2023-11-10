"use strict";
const MODE_UNITIALIZED = 0
const MODE_HORIZONTAL = 1
const MODE_VERTICAL = 2

const MODE_HOME = 0;
const MODE_CALENDAR = 1;
const MODE_SHOWS = 2;
const MODE_MAP = 3;
const MODE_CONTACTS = 4;
const MODE_CHECKOUT = 5;

var APP_MODE = MODE_HOME;

const GRID_TEMPLATE_VERTICAL = {
	'roof':{'left': '0px','top':'0px','width':'100%','height':'10%' },
	'menu':{'left': '0px','top':'10%','width':'100%','height':'5%' },
	'content':{'left': '0px','top':'15%','width':'100%','height':'84%'},
	'panel':{'left': '0px','top':'0%','width':'0%','height':'0%' },
	'infos':{'left': '0px','top':'84%','width':'100%','height':'25%'}
}

const GRID_TEMPLATE_HORIZONTAL = {
	'roof':{'left': '0px','top':'0px','width':'100%','height':'10%' },
	'menu':{'left': '0px','top':'10%','width':'12%','height':'90%' },
	'content':{'left': '12%','top':'10%','width':'68%','height':'90%'},
	'panel':{'left': '80%','top':'10%','width':'20%','height':'90%' },
	'infos':{'left': '0px','top':'80%','width':'100%','height':'25%'}
}

includeScript('/scripts/combo.js');
includeScript('/scripts/misc.js');
includeScript('/scripts/menu.js');

var app = null;

function SetGridItemCells(item, template, name){
	item.style.position = 'absolute';
	item.style.left = template[name]['left'];
	item.style.top = template[name]['top'];
	item.style.width = template[name]['width'];
	item.style.height = template[name]['height'];
}

function IsLandscape(){
	return window.innerWidth > window.innerHeight;
}

function OnVertical(){
	var roof = document.querySelector('#roof');
	SetGridItemCells(roof, GRID_TEMPLATE_VERTICAL, 'roof');

	var menu = document.querySelector('#menu');
	SetGridItemCells(menu, GRID_TEMPLATE_VERTICAL, 'menu');

	var content = document.querySelector('#content')
	SetGridItemCells(content, GRID_TEMPLATE_VERTICAL, 'content');

	var infos = document.querySelector('#infos');
	SetGridItemCells(infos, GRID_TEMPLATE_VERTICAL, 'infos');

	var panel = document.querySelector('#panel');
	panel.style.display = 'none';
	SetGridItemCells(panel, GRID_TEMPLATE_VERTICAL, 'panel');

	infos.style.display = 'none';
	
}

function OnHorizontal(){
	var roof = document.querySelector('#roof');
	SetGridItemCells(roof, GRID_TEMPLATE_HORIZONTAL, 'roof');

	var menu = document.querySelector('#menu');
	SetGridItemCells(menu, GRID_TEMPLATE_HORIZONTAL, 'menu');

	var content = document.querySelector('#content')
	SetGridItemCells(content, GRID_TEMPLATE_HORIZONTAL, 'content');

	var infos = document.querySelector('#infos');
	SetGridItemCells(infos, GRID_TEMPLATE_HORIZONTAL, 'infos');

	var panel = document.querySelector('#panel');
	panel.style.display = 'block';
	SetGridItemCells(panel, GRID_TEMPLATE_HORIZONTAL, 'panel');

	infos.style.display = 'none';
}

function OnHideInfos(){
	var elem = document.querySelector("#infos");   
	var pos = 75;
	var id = setInterval(frame, 20);
	function frame() {
		if (pos == 100) {
			clearInterval(id);
		} else {
			pos++; 
			elem.style.top = pos + '%'; 
		}
	}
}

function Application_t(){
	this.user = null;
	this.login = null;
	this.menu = null;
	this.infos = null;
	this.panel = null;
	this.userid = -1;
	this.content = null;
	this.status = null;
	this.mode = MODE_UNITIALIZED;
	this.CURRENT_SHOW = null;
  this.animated = new Array();
}

Application_t.prototype.ActivateMenu = function(active){
	var menu = document.querySelector('#menu');
	var entries = menu.querySelectorAll('a');
	for(var i=0;i<entries.length;i++){
		entries[i].disabled = 1 - active;
		if(active){
			entries[i].style.pointerEvents = 'auto';
			entries[i].style.cursor = 'pointer';	
		}
		else{
			entries[i].style.pointerEvents = 'none';
			entries[i].style.cursor = 'default';
		}
	}
}

Application_t.prototype.Home = function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.innerHTML = this.responseText;
		}
	};
	
	xhttp.open('GET', 'index.html', true);
	xhttp.send();
}

Application_t.prototype.Mount = function(elem){
	document.body.appendChild(elem);
}

Application_t.prototype.OnResize = function(event){
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(width < height){
		if(this.mode != MODE_VERTICAL){
			this.mode = MODE_VERTICAL;
			document.body.style.fontSize = '3vw';
			OnVertical();
		}
	}
	else{
		if(this.mode != MODE_HORIZONTAL){
			this.mode = MODE_HORIZONTAL;
			document.body.style.fontSize = '3vh';
			OnHorizontal();
		}
	}
	document.width = width;
	document.height = height;
	//OnMenuResize();
}
	
Application_t.prototype.Initialize = function(){
  MAKE_REQUEST('get', 'scripts/home.js', null, 'text/script');
  
	var elem = document.querySelector('#menu');
	if(elem){
		this.menu = new Menu_t(elem);
	}

	elem = document.querySelector('#content');
	if(elem){
		this.content = new Content_t(elem);
	}

	elem = document.querySelector('#panel');
	if(elem){
		this.panel = new Panel_t(elem);
	}

	elem = document.querySelector('#infos');
	if(elem){
		this.infos = new Infos_t(elem, 0);
	}

	this.OnResize();
	
	window.addEventListener('resize', this.OnResize);
	window.addEventListener('orientationchange', this.OnResize);
}

Application_t.prototype.SetContent = function(name){
	var timestamp = Math.round(+new Date() / 1000);
	MAKE_REQUEST('get', 'content/'+name+'.js', null, 'text/script');
}

Application_t.prototype.RefreshUI = function(){
	var view = document.querySelector('#modal_view');
	if(view)document.body.removeChild(view);
	app.ActivateMenu(true);
}

Application_t.prototype.Message = function(msg)
{
	app.SetContent('message');
}

function InitApp(){
	app = new Application_t();
	app.Initialize();
  console("hey hey hey!!!");
}

window.requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame	||
	window.msRequestAnimationFrame;

