// Cellular Automata attempt
//------------------------------------------
function ClampColor(c)
{
	if(c<0)return 0;
	else if(c>255)return 255;
	else return c;
};

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
	return new {BaseColor}(r,g,b,0);
};

function GetRandomGrey(c,v)
{
	var c = ClampColor(Math.floor(Math.random()*255*v+c));
	return new BaseColor(c,c,c,0);
};

function BaseColor(r,g,b,v)
{
	this.r = r;
	this.g = g;
	this.b = b;
	this.v = v;
}
	
function Cell(color)
{
	this.color = GetRandomGrey(color.r,color.v);
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

function CellularAutomata(nbx,nby)
{
	this.needUpdate = true;
	this.nbx = nbx;
	this.nby = nby;
	this.type = 'automata';
	this.elem = document.createElement('div');
    this.elem.style.textAlign = 'center';
    this.elem.style.color = 'rgb(0, 0, 0)';

    this.canvas = document.createElement('canvas'); 
    this.canvas.id = "canvas";
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.canvas.style.imageRendering = "optimizeSpeed";             /* Legal fallback */
	this.canvas.style.imageRendering = "-moz-crisp-edges";          /* Firefox        */
	this.canvas.style.imageRendering = "-o-crisp-edges";            /* Opera          */
	this.canvas.style.imageRendering = "-webkit-optimize-contrast"; /* Safari         */
	this.canvas.style.imageRendering = "optimize-contrast";         /* CSS3 Proposed  */
	this.canvas.style.imageRendering = "crisp-edges";               /* CSS4 Proposed  */
	this.canvas.style.imageRendering = "pixelated";                 /* CSS4 Proposed  */
	this.canvas.style.msInterpolationMode = "nearest-neighbor";     /* IE8+           */

	this.canvas.width = nbx;
	this.canvas.height = nby;
	this.elem.appendChild(this.canvas);

	this.counter = 0;

	this.rule = Math.floor(Math.random()*3);
	var c = Math.random()*200;
	this.color = new BaseColor(c,c,c,0.5);
	this.grid = new Grid(this.nbx + 2,this.nby,this.color);

	this.Init = function(){}

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

	this.Line = function(index, rule)
	{
		if(!index) {
			var row = this.grid.rows[0];
			for(var x=0;x<this.nbx+2;x++)
			{
				row.cells[x].alive = GetRandomAlive(50);
				row.cells[x].color = GetRandomGrey(this.color.r,this.color.v);
			}
		} else {
			var current = this.grid.rows[index];
			var previous = this.grid.rows[index-1];
			var left, right, alive;
			
			for(var x=1;x<this.nbx+1;x++)
			{
				left = x-1;
				right = x+1;

				var a = previous.cells[left].alive;
				var b = previous.cells[x].alive;
				var c = previous.cells[right].alive;

				alive = current.cells[x].alive;
				switch(rule)
				{
					case 0:
						alive = this.Rule90(a,b,c);
						break;
					case 1:
						alive = this.Rule105(a,b,c);
						break;
					case 2:
						alive = this.Rule110(a,b,c);
						break;
				}
				
				current.cells[x].alive = alive;
				current.cells[x].color = GetRandomGrey(this.color.r, this.color.v);
			}
		}
	}

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

			ctx.imageSmoothingEnabled = false;
			
			for(var a=0;a<this.grid.rows.length;a++)
			{
				row = this.grid.rows[a];
				for(var b=0;b<row.cells.length;b++)
				{
					var cell = row.cells[b];
					if(cell.alive){
						ctx.fillStyle = cell.sColor;
					}
					else ctx.fillStyle = 'black';
					ctx.fillRect(cx,cy,1,1);
					cx += resx;
				}
				cy +=resy;
				cx=0;
			}
		}
	}
	
	this.Update = function(){
		this.counter++;
		if(this.counter%5 == 0){
			var col = new BaseColor(200,200,200,0);
	
			for(var r = 0;r<this.nby;r++)
			{
				row = this.grid.rows[r];
				next = this.grid.rows[r+1];
				var b = (1-r*1/this.nby)*255;

				for(var c=0;c<this.nbx+2;c++)
				{
					row.cells[c].color = next.cells[c].color
					row.cells[c].alive = next.cells[c].alive;
					col.r = row.cells[c].color.r;
					col.g = row.cells[c].color.g;
					col.b = row.cells[c].color.b;
					row.cells[c].sColor = GetColorString(col);
				}
			}
			
			this.Line(this.nby-1);
			this.Draw();
		}
	}
	
	this.UpdateOnce = function()
	{
		for(var y = 0;y<this.nby;y++)
			this.Line(y, this.rule);
		this.Draw();
	
	}

	this.UpdateOnce();
	this.Draw();	
	return this;
}

