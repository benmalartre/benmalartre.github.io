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

function drawTitle(path,color){
	var canvas = document.getElementById('title');
	var context = canvas.getContext('2d');
	var img;
	loadImage(path,color,function(img){
		var ratio = img.height/img.width;
		var w = canvas.width;
		var h = canvas.width*ratio;
	
        context.drawImage(img, 0, 0, w, h);
/*
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
		*/
	});
	//img.src = canvas.toDataURL();
}

function Title(paths){

	this.paths = paths;
	this.pathID = 0;
	this.lastID = -1;
	this.image = null;
	this.canvas = document.getElementById('title');
	this.context = this.canvas.getContext('2d');
	this.T = 0;
	this.nextT = Math.floor(Math.random()*100);
	//drawTitle(this.path,"#FFFFFF");
	//drawTitle(this.path,"#FFFFFF");

	this.LoadImage = function(source,object, callback) {
		object.image = new Image();
		object.image.onload = function() {
			  callback(object);
		};
		img.src = source;
	}

	this.Draw = function(color){
		if(this.image==null || this.pathID!=this.lastID){
			loadImage(this.paths[this.pathID],this,function(obj){
				var ratio = obj.image.height/obj.image.width;
				var w = obj.canvas.width;
				var h = obj.canvas.width*ratio;
	
				obj.context.drawImage(obj.image, 0, 0, w, h);
				obj.lastID = obj.pathID;
			});
		}
	}

	this.Update = function(mx,my){
		this.T++;
		if(this.T>=this.nextT){
			this.T=0;
			this.nextT = Math.floor(Math.random()*1000+500);
			this.pathID++;
			if(this.pathID>=this.paths.length)this.pathID = 0;

		}
		this.Draw("#FFFFFF");
	}
	return this;
}
