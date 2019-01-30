function Turn(imgs){
	this.type = "turn";
	this.canvas = document.getElementById("turn"); // grabs the canvas element
	this.context=this.canvas.getContext("2d"); // returns the 2d context object
	
	//context.globalCompositeOperation = "lighter";
	this.nbi = imgs.length;
	this.current=0;
	this.bit = 0;
	this.images = new Array(this.nbi);
	for(var i=0;i<this.nbi;i++){
		this.images[i]=new Image() //creates a variable for a new image
		this.images[i].src= imgs[i];
	}
	
	this.Update = function(){
		 // specifies the location of the image
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.drawImage(this.images[this.current],0,0); // draws the image at the specified x and y location
		if(this.bit%2==0)this.current++;
		this.bit+=1;
		
		if(this.current>=this.nbi)this.current=0;
	}
}