bubbleData = [0.25,1, 0.33,0.75, 0.1,0.77, 0.05,0.5, 0.02,0.33, 0.22,0.1, 0.5,0.05, 0.75,0.2, 0.95,0.5, 0.79,0.75];
function IsDecade(year)
{
	var y1,y2;
	y1 = year/1000.0;
	y2 = Math.floor((year/10))/100.0;
	return(y1==y2);
}

function Bubble(ctx,x,y,w,h,d)
{
	var nb = bubbleData.length/2;
	var ox,oy;
	ctx.beginPath();
	ctx.moveTo(bubbleData[0]*w+x,bubbleData[1]*h+y);
	for(var i=1;i<nb;i++)
	{
		ox = Math.random()*10;
		oy = Math.random()*10;
		ctx.lineTo(bubbleData[i*2]*w+x+ox,bubbleData[i*2+1]*h+y+oy);
	}
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle="white";
	ctx.fill();
	
/*
	var cx, cy;
	if(!d){
		cx = x+w/4*3;
		cy = y+h/4*3;
	}
	else{
		cx = x+w/4*3;
		cy = y-h/4*3;
	}
	*/
}

function Timeline(now)
{
	if(!now)now=2014;
	start=1997;
	current = start;
	present = 2017;
	now = now;
	var nb = present-start;
	
	// get canvas object
	var canvas = document.getElementById('timeline');
	
	// only works with valid canvas
	if(canvas.getContext)
	{
		var ctx = canvas.getContext('2d');
		
		var x,y,w,h,delta, step;
		x=0;
		y=canvas.height-10;

		w = canvas.width;
		h = 7;
		step = w/nb;
		
		//Background
		ctx.beginPath();
		ctx.rect(0,y/2,w,canvas.height);
		ctx.fillStyle = "rgba(0,0,0,0.75)";
		ctx.fill();
		
		ctx.font = "12pt verdana";
		
		ctx.beginPath();
		ctx.strokeStyle = "rgb(120,120,120)";
		ctx.lineWidth = 1;
		ctx.moveTo(x,y);
		ctx.lineTo(x+w,y);
		ctx.stroke();
		
		for(var i=0;i<nb;i++)
		{
			ctx.beginPath();
			ctx.moveTo(x,y);
			if(IsDecade(current))
			{
				ctx.lineTo(x,y-h*3-Math.floor((Math.random() * 2) + 1));
				ctx.strokeText(current,x-20,y-h*2);
			}
			else
				ctx.lineTo(x,y-h);
			ctx.stroke();
			x+=step;
			current++;
		}
		
		Bubble(ctx,0,0,200,100,1);
		
		//ctx.fillRect(0,0,720,540);
	}
	
}