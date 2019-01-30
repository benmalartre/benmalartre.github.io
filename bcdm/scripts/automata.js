// Cellular Automata attempt
//------------------------------------------
function ClampColor(c)
{
	if(c<0)return 0;
	else if(c>255)return 255;
	else return c;
};

function BaseColor(r,g,b,v)
{
	this.r = r;
	this.g = g;
	this.b = b;
	this.v = v;
}
function GetRandomAlive(perc)
{
	r = Math.random() * 100;
	return (r<perc);
}
function GetColorString(color)
{
	return 'rgba('+ color.r +','+ color.g +','+ color.b +',1)';
};

function GetRandomColor(r,g,b,v)
{
	var r = ClampColor(Math.floor(Math.random()*255*v+r));
	var g = ClampColor(Math.floor(Math.random()*255*v+g));
	var b = ClampColor(Math.floor(Math.random()*255*v+b));
	var color = new BaseColor(r,g,b,0);
	return color;
};

	
function Cell(color,pattern)
{
	this.color = GetRandomColor(color.r,color.g,color.b,color.v);
	this.sColor = GetColorString(this.color);
	this.alive = GetRandomAlive(66);
}

function Row(nbx,color)
{
	this.cells = new Array(nbx);
	for(var i=0;i<nbx;i++)
	{
		this.cells[i] = new Cell(color);
	}
}

function Grid(x,y,color)
{
	this.rows = new Array(y);
	for(var i=0;i<y;i++)
	{
		this.rows[i] = new Row(x,color);
	}
}

function MouseMoveEvent(event)
{
	canvas_x = event.pageX;
	canvas_y = event.pageY;
	alert(x+","+y);
}

function CellularAutomata()
{
	this.nbx = 100;
	this.nby = 80;
	this.type = "automata";
	this.canvas = document.getElementById('automata');
	this.canvas.addEventListener('mousemove',MouseMoveEvent);
	this.r = Math.random()*55;
	this.g = Math.random()*55;
	this.b = Math.random()*55;
	this.v = 0.5;
	this.counter = 0;
	
	this.choose = Math.floor(Math.random()*3);
	
	this.color = new BaseColor(this.r,this.g,this.b,this.v);
	this.grid = new Grid(this.nbx,this.nby,this.color);

	this.Draw = function()
	{
		ctx = null,
		grad = null;
		
		var cx = cy = 0;
		
		if (this.canvas.getContext('2d')) 
		{
			ctx = this.canvas.getContext('2d');
			resx = Math.round(this.canvas.width/this.nbx);
			resy = Math.round(this.canvas.height/this.nby);
			
			for(var a=0;a<grid.rows.length;a++)
			{
				row = grid.rows[a];
				for(var b=0;b<row.cells.length;b++)
				{
					var cell = row.cells[b];
					if(cell.alive)ctx.fillStyle = cell.sColor;
					else ctx.fillStyle = 'black';
					ctx.fillRect(cx,cy,resx,resy);
					cx += resx;
				}
				cy +=resy;
				cx=0;
			}
		}
	}
	
	this.Update = function(mx,my){
		this.counter++;
		if(this.counter%10 == 0){
			var col = new BaseColor(200,200,200,0);
			var black = new BaseColor(0,0,0,0);
			for(var r = 0;r<this.nby-1;r++)
			{
				row = this.grid.rows[r];
				next = this.grid.rows[r+1];
				var b = (1-r*1/this.nby)*255;

				for(var c=0;c<this.nbx;c++)
				{
					row.cells[c].color = next.cells[c].color
					row.cells[c].alive = next.cells[c].alive;
					col.r = row.cells[c].color.r;
					col.g = row.cells[c].color.g;
					col.b = row.cells[c].color.b;
					row.cells[c].sColor = GetColorString(col);
					
				}
			}
			
			this.LastLine();
			this.Draw();
		}
	}
	
	this.UpdateOnce = function()
	{
		var col = new BaseColor(200,200,200,0);
		var black = new BaseColor(0,0,0,0);
		for(var y = 1;y<this.nby;y++)
		{
			last = grid.rows[y];
			row = grid.rows[y-1];
			//var b = (1-r*1/this.nby)*255;

			for(var x=0;x<this.nbx;x++)
			{
				left = x-1;
				right = x+1;
				if(left<0)left = this.nbx-1;
				if(right>(this.nbx-1))right = 0;
				
				var a = row.cells[left].alive;
				var b = row.cells[x].alive;
				var c = row.cells[right].alive;

				
				alive = last.cells[x].alive;
				switch(this.choose)
				{
					case 0:
						alive = Rule90(a,b,c);
						break;
					case 1:
						alive = Rule105(a,b,c);
						break;
					case 2:
						alive = Rule110(a,b,c);
						break;
				}
				
				last.cells[x].alive = alive;
				last.cells[x].color = GetRandomColor(this.color.r,this.color.g,this.color.b,this.color.v);
				
			}
		}
		
		LastLine();
		Draw();
	
	}
	
	this.FirstLine = function()
	{
		var row = this.grid.rows[0];
		for(var x=0;x<this.nbx;x++)
		{
			row.cells[x].alive = GetRandomAlive(50);
			row.cells[x].color = GetRandomColor(this.color.r,this.color.g,this.color.b,this.color.v);
		}
	}
	
	this.LastLine = function()
	{
		var row = this.grid.rows[this.nby-2];
		var last = this.grid.rows[this.nby-1];
		var left, right, alive;
		
		for(var x=0;x<this.nbx;x++)
		{

			left = x-1;
			right = x+1;
			if(left<0)left = this.nbx-1;
			if(right>(this.nbx-1))right = 0;
			
			var a = row.cells[left].alive;
			var b = row.cells[x].alive;
			var c = row.cells[right].alive;

			
			alive = last.cells[x].alive;
			switch(this.choose)
			{
				case 0:
					alive = Rule90(a,b,c);
					break;
				case 1:
					alive = Rule105(a,b,c);
					break;
				case 2:
					alive = Rule110(a,b,c);
					break;
			}
			
			last.cells[x].alive = alive;
			last.cells[x].color = GetRandomColor(this.color.r,this.color.g,this.color.b,this.color.v);
		}
	}
	
	this.Rule110 = function(a,b,c)
	{
		if(a && b && c) return false;
		else if(a && b && !c) return true;
		else if(a && b && !c) return true;
		else if(a && !b && c) return true;
		else if(a && !b && !c) return false;
		else if(!a && b && c) return true;
		else if(!a && b && !c) return true;
		else if(!a && !b && c) return true;
		else return false;
	}
	
	this.Rule105 = function(a,b,c)
	{
		if(a && b && c) return false;
		else if(a && b && !c) return true;
		else if(a && b && !c) return true;
		else if(a && !b && c) return true;
		else if(a && !b && !c) return false;
		else if(!a && b && c) return true;
		else if(!a && b && !c) return false;
		else if(!a && !b && c) return false;
		else return true;
	}
	
	this.Rule90 = function(a,b,c)
	{
		if(a && b && c) return false;
		else if(a && b && !c) return true;
		else if(a && !b && c) return false;
		else if(a && !b && !c) return true;
		else if(!a && b && c) return true;
		else if(!a && b && !c) return false;
		else if(!a && !b && c) return true;
		else if(!a && !b && !c) return false;
	}
	
	this.FirstLine();
	this.UpdateOnce();
	this.Draw();	
	return this;
}
