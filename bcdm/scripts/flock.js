// Flock
//------------------------------------------
FRAMESTEP = 16.666
function vec2(x,y){
	this.x = x;
	this.y = y;
	
	this.Set = function(in_x,in_y){
		this.x = in_x;
		this.y = in_y;
	}
	this.Length = function(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	this.Normalize = function(other){
		var l = other.Length();
		if(l!=0){
			var div = 1/l;
			this.x = other.x*div;
			this.y = other.y*div;
		}
	}
	this.NormalizeInPlace = function(){
		var l = this.Length();
		var div = 1/l;
		this.x*=div;
		this.y*=div;
	}
	this.Sub = function(a,b){
		this.x = b.x-a.x;
		this.y = b.y-a.y;
	}
	this.Add = function(a,b){
		this.x = a.x+b.x;
		this.y = a.y+b.y;
	}
	this.Scale = function(v,d){
		this.x = v.x*d;
		this.y = v.y*d;
	}
	this.Negate = function(v){
		this.x *= -1;
		this.y *= -1;
	}
	this.Reflect = function(v,axis){
		if(!axis)
			this.x = v.x * -1;
		else
			this.y = v.y * -1;
	}
	this.Perp = function(v){
		this.x = -v.y;
		this.y = v.x;
	}
	this.Dot = function(other){
		return (this.x*other.x + this.y*other.y);
	}
	this.Angle = function(other){
		return (Math.acos(this.Angle(other)));
	}
	
}

function Cell(in_x,in_y,in_width,in_height){
	this.column = in_x;
	this.row = in_y;
	this.colorr = Math.floor(Math.random()*255);
	this.colorg = Math.floor(Math.random()*255);
	this.colorb = Math.floor(Math.random()*255);
	this.agents = new Array()
	this.neighbors = new Array();
	
	this.PushAgents = function(agent){
		if(!agent.cell){
			this.agents.push(agent);
		}
		else if(agent.cell != this){
			var x = agent.cell.agents.indexOf(agent);
			agent.cell.agents.splice(x,1);
			this.agents.push(agent);
		}
		agent.cell = this;
	}
}

function Grid(canvas,in_x,in_y)
{
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctxt = canvas.getContext("2d");
	this.resolution = new vec2(in_x,in_y);
	this.stepx = this.width/(this.resolution.x-1);
	this.stepy = this.height/(this.resolution.y-1);
	this.nbcells = in_x*in_y;
	this.cells = new Array(this.nbcells);
	
	// Create Cells Objects
	for(var x=0;x<in_x;x++)
	{
		for(var y=0;y<in_y;y++)
		{
			this.cells[y*in_x+x] = new Cell(x,y);
		}
	}
	// Get NeighborHood Datas
	var id;
	for(var x=0;x<in_x;x++)
	{
		for(var y=0;y<in_y;y++)
		{
			id = y*in_x+x;
			if(y>0){
				if(x>0)this.cells[id].neighbors.push(this.cells[id-in_x-1]);
				this.cells[id].neighbors.push(this.cells[id-in_x]);
				if(x<(in_x-1))this.cells[id].neighbors.push(this.cells[id-in_x+1]);
			}
			if(x>0)this.cells[id].neighbors.push(this.cells[id-1]);
			if(x<(in_x-1))this.cells[id].neighbors.push(this.cells[id+1]);
			if(y<(in_y-1)){
				if(x>0)this.cells[id].neighbors.push(this.cells[id+in_x-1]);
				this.cells[id].neighbors.push(this.cells[id+in_x]);
				if(x<(in_x-1))this.cells[id].neighbors.push(this.cells[id+in_x+1]);
			}
		}
	}
	
	this.Partition = function(agents){
		var x,y, id;
		for(var i=0;i<agents.length;i++){
			x = Math.floor(agents[i].pos.x/this.stepx);
			y = Math.floor(agents[i].pos.y/this.stepy);
			id = y*this.resolution.x+x;
			if(id>0 && id<this.nbcells){
				//agents[i].SetColor(this.cells[id].colorr,this.cells[id].colorg,this.cells[id].colorb);
				this.cells[id].PushAgents(agents[i]);
			}
		}
	}
	
	this.Draw = function()
	{
		// vertical
		for(var x=0;x<this.resolution.x;x++)
		{
			this.ctxt.strokeStyle = "red";
			this.ctxt.beginPath();
			this.ctxt.moveTo(x*this.stepx,0)
			this.ctxt.lineTo(x*this.stepx,this.height)
			this.ctxt.stroke();
		}
		
		//horizontal
		step = this.height/this.resolution.y;
		for(var y=0;y<this.resolution.y;y++)
		{
			this.ctxt.strokeStyle = "red";
			this.ctxt.beginPath();
			this.ctxt.moveTo(0,y*this.stepy);
			this.ctxt.lineTo(this.width,y*this.stepy);
			this.ctxt.stroke();
		}
		
	}
}

function Agent(ctxt,id,x,y,sx,sy){
	this.id = id;
	this.desiredspeed = 0.1;
	this.speed = this.desiredspeed;
	this.evading = false;
	this.maximumspeed = 60;
	this.pos = new vec2(x,y);
	this.vel = new vec2(1-Math.random()*2,1-Math.random()*2);
	this.dir = new vec2(0,0);
	this.dir.Normalize(this.vel);
	this.vel.Scale(this.dir,this.speed);
	this.force = new vec2(0,0);
	this.tmp = new vec2(0,0);
	this.perp = new vec2(0,0);
	this.perp.Perp(this.vel);
	
	this.size = new vec2(sx,sy);
	this.cell = null;
	this.ctxt = ctxt;
	this.neighbors = new Array();
	this.colorr = 0;
	this.colorg = 0;
	this.colorb = 0;
	this.escaping = false;
	this.time = Math.random();
	
	this.DistanceFromOther = function(other)
	{
		var d = new vec2;
		d.Sub(this.pos,other.pos);
		return d.Length();
	}
	
	this.BlendVelocity = function(dir,weight){
		dir.Scale(dir,weight);
		var l = this.vel.Length();
		this.tmp.Add(this.vel,dir);
		this.tmp.NormalizeInPlace();
		this.vel.Scale(this.tmp,l);
	}
	
	this.IncreaseSpeed = function(incr){
		//this.speed = this.maximumspeed;
		if(this.speed<this.maximumspeed)this.speed += incr;
	}
	
	this.DecreaseSpeed = function(incr){
		//this.speed = this.desiredspeed;
		if(this.speed>this.desiredspeed)this.speed -= incr;
	}
	
	this.GetNeighbors = function(){
		this.neighbors.splice(0);
		
		var nc, na;
		if(this.cell){
		
			for(var a=0;a<this.cell.agents.length;a++){
				na = this.cell.agents[a];
				if(na != this)
					this.neighbors.push(na);
			}
			
			for(var n=0;n<this.cell.neighbors.length;n++){
				nc = this.cell.neighbors[n];
				for(var a=0;a<nc.agents.length;a++){
					na = nc.agents[a];
					this.neighbors.push(na);
				}
			}
		}
	}
	
	this.Collide = function(width,height)
	{
		this.tmp.Set(0,0);
		// Left Border
		var dlx = this.pos.x-this.size.x/2;
		if(dlx<0){
			this.pos.x=this.size.x/2;
			this.tmp.Set(10,0);
		}
		// Top Border
		var dty = this.pos.y-this.size.y/2;
		if(dty<0){
			this.pos.y=this.size.y/2;
			this.tmp.Set(0,10);
		}
	
		// Right Border
		var drx = this.pos.x+this.size.x/2;
		if(drx>width){
			this.pos.x=width-this.size.x/2;
			this.tmp.Set(-10,0);
		}
		// Bottom Border
		var dby = this.pos.y+this.size.y/2;
		if(dby>height){
			this.pos.y=height-this.size.y/2;
			this.tmp.Set(0,-10);
		}
		this.force.Add(this.force,this.tmp);
		
		var l,d;
		for(var n=0;n<this.neighbors.length;n++){
			this.tmp.Sub(this.neighbors[n].pos,this.pos);
			l = this.tmp.Length();
			d=(this.size.x+this.neighbors[n].size.x)*0.5;
			if(l<d){
				this.tmp.NormalizeInPlace();
				this.tmp.Scale(this.tmp,d*(this.size.x/(this.size.x+this.neighbors[n].size.x)));
				this.pos.Add(this.pos,this.tmp);
			}
		}
		
		this.BlendVelocity(this.tmp,1);
		
	}
	
	this.SetColor = function(r,g,b){
		this.colorr = r;
		this.colorg = g;
		this.colorb = b;
	}
	
	this.Wander = function(weight)
	{
		this.tmp.x = (1-Math.random()*2);
		this.tmp.y = (1-Math.random()*2);
		this.tmp.NormalizeInPlace();
		this.tmp.Scale(this.tmp,weight);
		this.force.Add(this.force,this.tmp);
	}
	
	this.Evade = function(mx,my){
		this.tmp.Set(this.pos.x-mx,this.pos.y-my);
		var l = this.tmp.Length();
		var d = 50;
		if(l<d){
			this.evading = true;
			this.tmp.Scale(this.tmp,(d-l));
			//this.BlendVelocity(this.tmp,0.5);
			this.IncreaseSpeed(5);
			this.force.Add(this.force,this.tmp);
			//this.speed = 100;
		}
		else{
			this.DecreaseSpeed(5);
			this.evading = false;
			//this.speed = this.desiredspeed;
		}
	}
	
	this.Repulsion = function(weight)
	{
		var l,d;
		for(var n=0;n<this.neighbors.length;n++){
			this.tmp.Sub(this.neighbors[n].pos,this.pos);
			l = this.tmp.Length();
			d=this.size.x*4+this.neighbors[n].size.x*4;
			if(l<d){
				this.tmp.NormalizeInPlace();
				this.tmp.Scale(this.tmp,weight);
				this.force.Add(this.force,this.tmp);
				
			}
		}
	}
	
	this.Cohesion = function(weight){
		var l,d;
		for(var n=0;n<this.neighbors.length;n++){
			this.tmp.Sub(this.neighbors[n].pos,this.pos);
			l = this.tmp.Length();
			d=100;
			if(l<d){
				this.tmp.Scale(this.tmp,(d-l)/d);
				//this.BlendVelocity(this.tmp,weight);
				this.force.Add(this.force,this.tmp);
			}
		}
	}
	
	this.Alignment = function(weight){
		this.tmp.Set(0,0);
		var nb = this.neighbors.length
		if(nb){
			for(var n=0;n<nb;n++){
				this.tmp.Add(this.tmp,this.neighbors[n].vel);
			}
			this.tmp.Scale(this.tmp,1/nb);
			this.BlendVelocity(this.tmp,weight);
			//this.force.Add(this.force,this.tmp);
		}
	}
	
	this.Speed = function()
	{
		this.vel.NormalizeInPlace(this.vel);
		this.vel.Scale(this.vel,this.speed);
	}
	
	this.Update = function(mx,my)
	{
		this.GetNeighbors();
		this.Evade(mx,my);
		if(this.evading)
			this.Wander(10);
		else
			this.Wander(1);
		//this.Repulsion(12);
		//this.Alignment(0.75);
		this.Speed();
		
		this.tmp.Scale(this.vel,1/FRAMESTEP)
		this.pos.Add(this.pos,this.tmp);
		this.vel.Add(this.vel,this.force);
		
	}
	
	this.DrawLegs = function(){
	/*
		var sp = 0.75;
		var lp = 1.4;
		this.ctxt.strokeStyle = "black";
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x-this.perp.x,this.pos.y-this.perp.y);
		this.ctxt.lineTo(this.pos.x-this.perp.x*lp,this.pos.y-this.perp.y*lp);
		this.ctxt.stroke();
		
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x-this.perp.x-this.dir.x*sp,this.pos.y-this.perp.y-this.dir.y*sp);
		this.ctxt.lineTo(this.pos.x-this.perp.x*lp-this.dir.x*sp,this.pos.y-this.perp.y*lp-this.dir.y*sp);
		this.ctxt.stroke();
		
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x-this.perp.x+this.dir.x*sp,this.pos.y-this.perp.y+this.dir.y*sp);
		this.ctxt.lineTo(this.pos.x-this.perp.x*lp+this.dir.x*sp,this.pos.y-this.perp.y*lp+this.dir.y*sp);
		this.ctxt.stroke();
		
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x+this.perp.x,this.pos.y+this.perp.y);
		this.ctxt.lineTo(this.pos.x+this.perp.x*lp,this.pos.y+this.perp.y*lp);
		this.ctxt.stroke();
		
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x+this.perp.x-this.dir.x*sp,this.pos.y+this.perp.y-this.dir.y*sp);
		this.ctxt.lineTo(this.pos.x+this.perp.x*lp-this.dir.x*sp,this.pos.y+this.perp.y*lp-this.dir.y*sp);
		this.ctxt.stroke();
		
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x+this.perp.x+this.dir.x*sp,this.pos.y+this.perp.y+this.dir.y*sp);
		this.ctxt.lineTo(this.pos.x+this.perp.x*lp+this.dir.x*sp,this.pos.y+this.perp.y*lp+this.dir.y*sp);
		this.ctxt.stroke();
		*/
	}
	
	this.Draw = function()
	{
		//Draw Body
		this.ctxt.fillStyle = 'rgb('+this.colorr+','+this.colorg+','+this.colorb+')';
		this.ctxt.strokeStyle = 'grey';
		var hsx = this.size.x*0.5;
		var hsy = this.size.y*0.5;
		this.dir.Normalize(this.vel);
		this.dir.Scale(this.dir,this.size.y*0.5);
		this.perp.Perp(this.dir);
		this.perp.NormalizeInPlace();
		this.perp.Scale(this.perp,this.size.x*0.5);
		
		this.ctxt.beginPath();
		//this.ctxt.arc(this.pos.x,this.pos.y,this.size.x*0.5,0,2*Math.PI);
		this.ctxt.moveTo(this.pos.x-this.dir.x-this.perp.x,this.pos.y-this.dir.y-this.perp.y);
		//this.ctxt.lineTo(this.pos.x+a.x-b.x,this.pos.y+a.y-b.y);
		//this.ctxt.lineTo(this.pos.x+a.x+b.x,this.pos.y+a.y+b.y);
		this.ctxt.lineTo(this.pos.x+this.dir.x-this.perp.x,this.pos.y+this.dir.y-this.perp.y);
		this.ctxt.lineTo(this.pos.x+this.dir.x+this.perp.x,this.pos.y+this.dir.y+this.perp.y);
		this.ctxt.lineTo(this.pos.x-this.dir.x+this.perp.x,this.pos.y-this.dir.y+this.perp.y);
		this.ctxt.closePath();
		
		this.ctxt.fill();
		
		this.DrawLegs();
		
		/*
		if(this.id == 0){
			this.ctxt.strokeStyle = "red";
			this.ctxt.lineWidth = 2;
			this.ctxt.beginPath();
			this.ctxt.arc(this.pos.x,this.pos.y,this.size.x*3,0,2*Math.PI);
			this.ctxt.stroke();

			this.ctxt.strokeStyle = "yellow";
			this.ctxt.lineWidth = 2;
			var na;
			for(var n=0;n<this.neighbors.length;n++){
				na = this.neighbors[n];
				this.ctxt.beginPath();
				this.ctxt.arc(na.pos.x,na.pos.y,na.size.x*2,0,2*Math.PI);
				this.ctxt.stroke();
			}
		}
		// Draw Velocity
		this.ctxt.strokeStyle = 'yellow';
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.pos.x,this.pos.y);
		this.ctxt.lineTo(this.pos.x+this.vel.x,this.pos.y+this.vel.y);
		this.ctxt.stroke();
		*/
		
	}
}

function Flock(nbAgents,in_width,in_height)
{
	this.canvas = document.getElementById('flock');
	this.ctxt = this.canvas.getContext("2d");
	this.type = "flock";
	if(!this.ctxt)return;
	
	this.width = 360;
	this.canvas.width = 360;
	this.height = 360*(in_height/in_width);
	this.canvas.height = this.height;
	this.nb = nbAgents;
	this.ctxt.clearRect(0,0,this.width,this.height);
	this.agents = new Array(nbAgents);
	var r1,r2;
	
	for(var i=0;i<this.nb;i++)
	{
		r1 = Math.random();
		r2 = Math.random();
		s = Math.random()+0.5;
		this.agents[i] = new Agent(this.ctxt,i,this.width*r1,this.height*r2,this.width/66*s,this.width/66*s);
	}
	
	this.grid = new Grid(this.canvas,12,10);
	
	this.Light = function(_mx,_my){
		var grd = this.ctxt.createRadialGradient(_mx,_my,this.width/100,_mx,_my,this.width/2);
		grd.addColorStop(0,'rgba(0,0,0,0)');
		grd.addColorStop(0.7,'rgba(0,0,0,0.77)');
		grd.addColorStop(1,'rgba(0,0,0,1)');
		this.ctxt.fillStyle = grd;
		this.ctxt.fillRect(0,0,this.width,this.height);
	}
	
	this.Update = function(mx,my)
	{
		this.grid.Partition(this.agents);
		this.ctxt.clearRect(0,0,this.width,this.height);
		var _mx = mx*this.width;
		var _my = my*this.height;
		
		for(var i=0;i<this.nb;i++)
		{
			this.agents[i].Collide(this.width,this.height);
			this.agents[i].Update(_mx,_my);
			this.agents[i].Draw();
		}
		
		//this.grid.Draw();
		this.Light(_mx,_my);
		
	}
	return this;

}