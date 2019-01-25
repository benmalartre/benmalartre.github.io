
window.requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame	||
	window.msRequestAnimationFrame;

var manager;
window.addEventListener('load', InitManager, false);



function Manager(){
	this.objects = new Array();
	
	this.Init = function(){
		for(var i=0;i<this.objects.length;i++){
			this.objects[i].Init();
		}

	}
	this.AddObject = function(object){
		this.objects.push(object);
	}
	
	this.Update = function(m_x,m_y){
		for(var i=0;i<this.objects.length;i++){
			this.objects[i].Update(m_x,m_y)
		}

	}
	manager = this;
	return this;
}
function InitManager(){
	manager.Init();
}

