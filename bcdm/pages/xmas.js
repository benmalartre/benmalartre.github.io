function GradientCircle(context,x,y,radius){
	context.beginPath();
	context.arc(x,y,radius,0,2*Math.PI,false);

	// create radial gradient
	var grd = context.createRadialGradient(x, y, 10, x, y, 300);
	var basecolor = Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255);
	// light blue
	grd.addColorStop(0, 'rgba('+basecolor+',1)');
	// dark blue
	grd.addColorStop(1, 'rgba('+basecolor+',0)');

	context.fillStyle = grd;
	context.fill();
}

function XMasBackground(width,height){
	this.canvas = document.getElementById('background');
	this.canvas.width = width;
	this.canvas.height = height;
	this.context = this.canvas.getContext('2d');
	
	GradientCircle(this.context,Math.random()*width,Math.random()*height,100);

	this.Update = function(mx,my){
		var nb = 1;//Math.floor(Math.random()*6)+6;
		for(var i=0;i<nb;i++){
			GradientCircle(this.context,Math.random()*width,Math.random()*height,Math.random()*100+50);
		}
	}
}
