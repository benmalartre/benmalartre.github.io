DEGTORAD	 = 0.0174532925;
var IE = document.all?true:false
if (!IE) document.captureEvents(Event.MOUSEMOVE)

function ClampColor(c){
	if(c<0)return 0;
	else if(c>255)return 255;
	else return c;
};

function BaseColor(r,g,b,a){
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

function GetColorString(color){
	return 'rgba('+ color.r +','+ color.g +','+ color.b +','+color.a+')';
};

function GetRandomColor(r,g,b,v){
	var r1 = ClampColor(Math.floor(Math.random()*255*v+r));
	var g1 = ClampColor(Math.floor(Math.random()*255*v+g));
	var b1 = ClampColor(Math.floor(Math.random()*255*v+b));
	var a1 = Math.random()*0.5+0.25;
	var color = new BaseColor(r1,g1,b1,a1);
	return color;
};
/*
window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();
*/

function ray(nb,x,y,r,r1,r2,plane,depth){
	
	this.nb = nb;
	this.x = x;
	this.y = y;
	this.radius = r;
	this.r1 = r1;
	this.r2 = r2;
	this.time = (new Date()).getTime();
	this.seed = Math.random()*1000;
	this.plane = plane;
	this.theta=0;
	this.width = 50;//Math.random()*25+75;
	this.speed = (Math.random()*2-1)*0.0001;
	this.colored = false;//Math.random()<0.5;
	this.depth = depth;
	this.SetColor = function(r,g,b,v){
		this.color = GetRandomColor(r,g,b,v);
	}
}

function background(){
	this.c1 = GetRandomColor(200,100,30,0.5);
	this.c2 = GetRandomColor(200,100,30,0.5);
	this.m1 = 'rgba(0,0,0,0)';
	this.m2 = 'rgba(0,0,0,1)';
}

function backgroundGradients(){
	var canvas = document.getElementById("godrays");
	var context = canvas.getContext("2d");
	var bg = new background();
	
	var lin = context.createLinearGradient(0,0,canvas.width,0);
	lin.addColorStop(0,GetColorString(bg.c1));
	lin.addColorStop(1,GetColorString(bg.c2));
	
	context.globalCompositeOperation ="copy";
	context.fillStyle = lin;
	context.rect(0,0,canvas.width,canvas.height);
	context.fill();
	/*
	context.stroke();
	context.clip();
	context.fillStyle = "yellow";
	context.rect(0,0,canvas.width,canvas.height);
	context.restore();
	*/
}

function drawPlanes(context,r,id){
	var step = 360/r.nb*DEGTORAD;
	var half = step*r.width/200;
	//var thalf = half;
	//var bhalf = half/3;
	var t = (r.time+r.seed)*r.speed;
	var thalf = Math.sin(t*2)*half*3;
	var bhalf = Math.sin(t*2)*half*2;
	
	var ax,ay,bx,by,cx,cy,dx,dy;
	var grd = context.createRadialGradient(r.x,r.y,r.r1,r.x,r.y,r.radius/2);
	grd.addColorStop(0,'rgba(255,0,0,0)');
	grd.addColorStop(1,'rgba(255,0,0,255)');
	/*
	if(r.colored)
		grd.addColorStop(1,'rgba(1,0,0,0.77)');//GetColorString(r.color));
	else
		grd.addColorStop(1,'rgba(1,0,0,0.77)');
	*/
		
	context.strokeStyle = grd;
	context.fillStyle = grd;
	//context.globalCompositeOperation ="source-over";
	//context.globalCompositeOperation = "copy";
	//context.globalCompositeOperation = "destination-atop";
	//context.globalCompositeOperation = "destination-in";
	//context.globalCompositeOperation = "destination-out";
	//context.globalCompositeOperation = "destination-over";
	//context.globalCompositeOperation = "source-atop";
	//context.globalCompositeOperation = "source-in";
	//context.globalCompositeOperation = "source-out";
	//context.globalCompositeOperation = "source-over";
	//context.globalCompositeOperation ="lighter";
	//context.globalAlpha = 0.5;
	
	var inner = 0;
	for(var i=0;i<r.nb;i++)
	{
		ax = r.x+Math.cos(i*step-bhalf+t)*inner;
		ay = r.y+Math.sin(i*step-bhalf+t)*inner;
		bx = r.x+Math.cos(i*step-thalf+t)*r.radius;
		by = r.y+Math.sin(i*step-thalf+t)*r.radius;
		cx = r.x+Math.cos(i*step+thalf+t)*r.radius;
		cy = r.y+Math.sin(i*step+thalf+t)*r.radius;
		dx = r.x+Math.cos(i*step+bhalf+t)*inner;
		dy = r.y+Math.sin(i*step+bhalf+t)*inner;
		context.beginPath();
		context.moveTo(ax,ay);
		context.lineTo(bx,by);
		context.lineTo(cx,cy);
		context.lineTo(dx,dy);
		context.closePath();
		context.fill();
	}
}

function drawRays(context,r){
	var step = 360/r.nb*DEGTORAD;
	
	var ax,ay,bx,by,cx,cy,dx,dy;
	var grd = context.createRadialGradient(r.x,r.y,100,r.x,r.y,r.radius/2);
	grd.addColorStop(0,'rgba(0,0,0,0)');
	var red = Math.random();
	grd.addColorStop(1,'rgba('+red+',0,0,1)');
		
	context.strokeStyle = grd;

	for(var i=0;i<nb;i++)
	{
		ax = r.x;
		ay = r.y;
		bx = r.x+Math.cos(i*step+r.time*0.00002)*r.radius;
		by = r.y+Math.sin(i*step+r.time*0.00002)*r.radius
		context.beginPath();
		context.moveTo(ax,ay);
		context.lineTo(bx,by);
		context.stroke();
	}
}

function GodRays(nb)
{
	this.type = "godrays";
	this.canvas = document.getElementById('godrays');
	this.canvas.width = window.innerWidth * 0.25;
	this.canvas.height = window.innerHeight * 0.25;
	this.context = this.canvas.getContext('2d');
	this.nb = nb;
	this.rays = new Array(nb);
	this.time = (new Date()).getTime();
	this.hw = this.canvas.width *0.5;
	this.hh = this.canvas.height *0.5;
	this.x = this.hw;
	this.y = this.hh;

	var r,g,b;

	for(var i=0;i<this.nb;i++)
	{
		var theta = 0;
		
		var nbr = 30+Math.floor((Math.random()*2-1)*15);
		var plane = (Math.random()>0.25);
		var width = 75+(Math.random()*2-1)*25;
		var xx = this.x;//+(Math.random()*2-1)*this.hw*0.1;
		var yy = this.y;//+(Math.random()*2-1)*this.hh*0.1;
		this.rays[i] = new ray(nbr,xx,yy,this.hw*4,Math.random()*this.hw/2,this.hw,true,i);
		//this.rays[i].SetColor(255*i%3,255*(i-1)%3,255*(i-2)%3,1);
		this.rays[i].SetColor(1,0,0.5,1);
	}
	
	this.Update = function(m_x,m_y){
	
		// clear
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.save();

		var mx,my,vx,vy,w;
		//backgroundGradients()
		this.context.fillStyle = 'rgba(255,255,0,255)';
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
		// update
		for(var r=0;r<this.rays.length;r++)
		{
			var time = (new Date()).getTime();
			var timeDiff = time - this.rays[r].time;
			
			this.rays[r].theta += timeDiff / 400;
			this.rays[r].time = time;
			if(this.mouse){
				w = (this.rays[r].depth+1)/this.rays.length*0.1;
				mx = m_x*this.hw*2;
				my = m_y*this.hh*2;
				vx = mx-this.rays[r].x;
				vy = my-this.rays[r].y;
				this.rays[r].x += vx*w;// += Math.random()*xx*0.1;
				this.rays[r].y += vy*w;// += Math.random()*yy*0.1;
			}
			
			
			// draw
			if(!this.rays[r].plane)
				drawRays(this.context,this.rays[r]);
			else
				drawPlanes(this.context,this.rays[r],r);
		}
		
		this.context.restore();
		
	}
	return this;

}

