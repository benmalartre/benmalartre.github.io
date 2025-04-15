"use strict";
const MODE_UNITIALIZED = 0
const MODE_HORIZONTAL = 1
const MODE_VERTICAL = 2

const GRID_TEMPLATE_VERTICAL = {
	'roof':{'left': '0px','top':'0px','width':'100%','height':'10%' },
	'menu':{'left': '0px','top':'10%','width':'100%','height':'5%' },
	'content':{'left': '0px','top':'15%','width':'100%','height':'85%'}
}

const GRID_TEMPLATE_HORIZONTAL = {
	'roof':{'left': '0px','top':'0px','width':'100%','height':'10%' },
	'menu':{'left': '0px','top':'10%','width':'12%','height':'90%' },
	'content':{'left': '12%','top':'10%','width':'90%','height':'90%'}
}

includeScript('/scripts/misc.js');
includeScript('/scripts/menu.js');
includeScript('/scripts/automata.js');

var app = null;

function FixScrollUpdateSafariIOs() {
    const isIosSafari = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
    // Check if it's an iOS device and Safari
    const isMobileSafari = isIosSafari && window.innerWidth < 768;
    if (isMobileSafari) {
        (function () {
            // Create a hidden log div
            const logDiv = document.createElement('div');
            logDiv.style.height = '0px'; // Set the height to 0 pixels
            logDiv.style.overflow = 'hidden'; // Hide the content
            document.body.appendChild(logDiv);

            // Function to update the log with the scroll position
            function updateLog() {
                logDiv.innerHTML = window.scrollY.toFixed(0);
            }

            // Add listeners for scroll and touch events
            window.addEventListener('scroll', updateLog, { passive: true, capture: true });
            window.addEventListener('touchstart', updateLog, { passive: true, capture: true });
            window.addEventListener('touchmove', updateLog, { passive: true, capture: true });
            window.addEventListener('touchend', updateLog, { passive: true, capture: true });
        })();
    }
}

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

	var content = document.querySelector('#content');
	SetGridItemCells(content, GRID_TEMPLATE_VERTICAL, 'content');
}

function OnHorizontal(){
	var roof = document.querySelector('#roof');
	SetGridItemCells(roof, GRID_TEMPLATE_HORIZONTAL, 'roof');

	var menu = document.querySelector('#menu');
	SetGridItemCells(menu, GRID_TEMPLATE_HORIZONTAL, 'menu');

	var content = document.querySelector('#content')
	SetGridItemCells(content, GRID_TEMPLATE_HORIZONTAL, 'content');
}

function Application_t(){
	this.user = null;
	this.login = null;
	this.menu = null;
	this.content = null;
	this.status = null;
	return this;
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
}
	
Application_t.prototype.Initialize = function(){  
	var elem = document.querySelector('#menu');
	this.menu = new Menu_t(elem);
	elem = document.querySelector('#content');
	this.content = new Content_t(elem);

	this.SetContent("usd");


	this.OnResize();
	
	window.addEventListener('resize', this.OnResize);
	window.addEventListener('orientationchange', this.OnResize);

	FixScrollUpdateSafariIOs();


}

Application_t.prototype.Update = function() {  
	this.content.Update();
}

Application_t.prototype.SetContent = function(name){
	var timestamp = Math.round(+new Date() / 1000);
	MAKE_REQUEST('get', 'content/'+name+'.js', null, 'text/script');

	var content = document.querySelector('#content');
	content.style.height = '2000px';
}

Application_t.prototype.RefreshUI = function(){
	var view = document.querySelector('#modal_view');
	if(view)document.body.removeChild(view);
	app.ActivateMenu(true);
}

function InitApp(){
	app = new Application_t();
	app.Initialize();
}

window.requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame	||
	window.msRequestAnimationFrame;

