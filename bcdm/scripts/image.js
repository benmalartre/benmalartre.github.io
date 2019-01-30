function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function loadImage(source,color, callback) {
	var img;

	img = new Image();
	img.onload = function() {
		  callback(img,color);
	};
	img.src = source;

}

function drawImage(path,color){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	loadImage(path,color,function(img){
		var ratio = img.height/img.width;
		var w = canvas.width;
		var h = canvas.width*ratio;
	
        context.drawImage(img, 0, 0, w, h);
		// get the image data object
		var image = context.getImageData(0, 0, w, h);
		// get the image data values 
		var imageData = image.data,
		length = imageData.length;

		var r = hexToR(color);
		var g = hexToG(color);
		var b = hexToB(color);
		var invert = Math.random()<0.666;
		for(var i=3; i < length; i+=4){
			if(invert){
				if(imageData[i-3]+imageData[i-2]+imageData[i-1]>300)
				imageData[i] = 255;
				else imageData[i] = 0;
			}
			else{
				if(imageData[i-3]+imageData[i-2]+imageData[i-1]>300)
				imageData[i] = 0;
				else imageData[i] = 255;
			}
			imageData[i-3]=r;
			imageData[i-2]=g;
			imageData[i-1]=b;
		}
		// after the manipulation, reset the data
		image.data = imageData;
		// and put the imagedata back to the canvas
		context.putImageData(image, 0, 0);
		//context.restore();
		
	});
	img.src = canvas.toDataURL();
}


function loadImages(object, callback) {
	var loadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var src in object.sources) {
	  numImages++;
	}
	for(var src in object.sources) {
	  object.images[src] = new Image();
	  object.images[src].onload = function() {
		if(++loadedImages >= numImages) {
		  callback(object);
		}
	  };
	  object.images[src].src = object.sources[src];
	}
}

function AnimatedBackground(bgpath,bgcolor,fgpath,fgcolor,width,height){

	this.type = "animatedbackground";
	this.canvas = document.getElementById('background');
	this.canvas.width = width;
	this.canvas.height = height;
	this.context = this.canvas.getContext('2d');
	this.images = {};
	this.__bg = {};
	this.__fg = {};
	this.imageData = null;
	this.bgData = null;
	this.fgData = null;
	this.bgstate = 0;
	this.fgstate = 0;
	this.fg_lum = 100;
	this.bg_lum = 200;
	this.width = width;
	this.height = height;	
	this.sources = {
        bg: bgpath,
        fg: fgpath
      };
	  
	  this.colors = {
        bg: bgcolor,
        fg: fgcolor
      };
	  
	  loadImages(this, function(object) {
		object.ratio = object.images.bg.height/object.images.bg.width;
		object.width = object.canvas.width;
		object.height = object.canvas.width*object.ratio;
		
		object.imageData = object.context.createImageData(object.width , object.height);
		object.pixelIndex = 0;
		object.context.drawImage(object.images.bg,0,0,object.width ,object.height);
		object.bgData = object.context.getImageData(0,0,object.width ,object.height);
		object.context.drawImage(object.images.fg,0,0,object.width ,object.height);
		object.fgData = object.context.getImageData(0,0,object.width ,object.height);
		
		object.bgr = hexToR(object.colors.bg);
		object.bgg = hexToG(object.colors.bg);
		object.bgb = hexToB(object.colors.bg);
	

		object.fgr = hexToR(object.colors.fg);
		object.fgg = hexToG(object.colors.fg);
		object.fgb = hexToB(object.colors.fg);
		object.context.clearRect(0,0,object.width,object.height);
		for(var y=0;y<object.height;y++){
			for(var x=0;x<object.width;x++){
		
				if((object.bgData.data[object.pixelIndex]+object.bgData.data[object.pixelIndex+1]+object.bgData.data[object.pixelIndex+2])/3<this.bg_lum){
					object.__bg[object.pixelIndex/4] = true;
					object.imageData.data[object.pixelIndex    ] = object.bgr;
					object.imageData.data[object.pixelIndex + 1] = object.bgg;
					object.imageData.data[object.pixelIndex + 2] = object.bgb;
					object.imageData.data[object.pixelIndex + 3] = 255;
				}
				else object.__bg[object.pixelIndex/4] = false;

				if((object.fgData.data[object.pixelIndex]+object.fgData.data[object.pixelIndex+1]+object.fgData.data[object.pixelIndex+2])/3<120){
					object.imageData.data[object.pixelIndex    ] += object.fgr;
					object.imageData.data[object.pixelIndex + 1] += object.fgg;
					object.imageData.data[object.pixelIndex + 2] += object.fgb;
					object.imageData.data[object.pixelIndex + 3] = 255;
					object.__fg[object.pixelIndex/4] = true;
				}
				else object.__fg[object.pixelIndex/4] = false;
				
				
				object.pixelIndex = object.pixelIndex+4;
			}
		}
		
		var canvasX = 0;
		var canvasY = 0;

		object.context.putImageData(object.imageData, canvasX, canvasY);
		return object;
		
      });
	  
	  this.Update = function(mx,my){
		this.bgr = Math.random()*255;
		this.bgg = Math.random()*255;
		this.bgb = Math.random()*255;
		this.fgg = Math.random()*255;
		this.fgr = Math.random()*255;
		this.fgg = Math.random()*255;
		this.bg_lum = Math.random()*255;
		this.fg_lum = Math.random()*255;
		var pixelIndex = 0;
		var width = this.canvas.width;
		var height = this.canvas.height;
		var data = this.imageData.data;
		var bgdata = this.bgData.data;
		var fgdata = this.fgData.data;

		for(var y=0;y<height;y++){
			for(var x=0;x<width;x++){
				data[pixelIndex 	] = bgdata[pixelIndex];
				data[pixelIndex+1	] =  bgdata[pixelIndex+1];
				data[pixelIndex+2	] =  bgdata[pixelIndex+2];
				data[pixelIndex + 3] =  bgdata[pixelIndex+3];
				
				if(this.__bg[pixelIndex/4]){
					data[pixelIndex    ] =this.bgr;
					data[pixelIndex + 1] = this.bgg;
					data[pixelIndex + 2] = this.bgb;
					data[pixelIndex + 3] = this.bg_lum;
				}
				
				if(this.__fg[pixelIndex/4]){
					data[pixelIndex    ] += this.fgr;
					data[pixelIndex + 1] += this.fgg;
					data[pixelIndex + 2] += this.fgb;
					data[pixelIndex + 3] = this.fg_lum;
				}
				
				pixelIndex = pixelIndex+4;
			}
		}
		
		var canvasX = Math.random()*50-25;
		var canvasY = Math.random()*50-25;

		this.context.putImageData(this.imageData, canvasX, canvasY);
	  }
	  return this;
}

function drawBackground(bgpath,bgcolor,fgpath,fgcolor){
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var sources = {
        bg: bgpath,
        fg: fgpath
      };
	  
	var colors = {
        bg: bgcolor,
        fg: fgcolor
      };

      loadImages(sources, function(images) {
	  	if(images.bg.height>images.bg.width)
			var ratio = images.bg.width/images.bg.height;
		else
			var ratio = images.bg.height/images.bg.width;
		var w = canvas.width;
		var h = canvas.width*ratio;
		
		var imageData = context.createImageData(w, h);
		var pixelIndex = 0;
		context.drawImage(images.bg,0,0,w,h);
		var bgData = context.getImageData(0,0,w,h);
		context.drawImage(images.fg,30,30,w,h);
		var fgData = context.getImageData(0,0,w,h);

		var bgr = hexToR(bgcolor);
		var bgg = hexToG(bgcolor);
		var bgb = hexToB(bgcolor);
		
		var fgr = hexToR(fgcolor);
		var fgg = hexToG(fgcolor);
		var fgb = hexToB(fgcolor);
		for(var y=0;y<h;y++){
			for(var x=0;x<w;x++){
		
				if((bgData.data[pixelIndex]+bgData.data[pixelIndex+1]+bgData.data[pixelIndex+2])/3<120){
					imageData.data[pixelIndex    ] = bgr;
					imageData.data[pixelIndex + 1] = bgg;
					imageData.data[pixelIndex + 2] = bgb;
					imageData.data[pixelIndex + 3] = 255;
				}

				if((fgData.data[pixelIndex]+fgData.data[pixelIndex+1]+fgData.data[pixelIndex+2])/3<120){
					imageData.data[pixelIndex    ] += fgr;
					imageData.data[pixelIndex + 1] += fgg;
					imageData.data[pixelIndex + 2] += fgb;
					imageData.data[pixelIndex + 3] = 255;
				}
				
				
				pixelIndex = pixelIndex+4;
			}
		}
		
		var canvasX = Math.random()*100;
		var canvasY = Math.random()*100;

		context.putImageData(imageData, canvasX, canvasY);
		
      });
}
