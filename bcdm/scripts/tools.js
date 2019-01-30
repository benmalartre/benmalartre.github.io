function random_background()
{
	var imgArray = ["images/image2.jpg",
	"images/image3.jpg",
	"images/image4.jpg",
	"images/background/mozaik.gif",
	"images/background/mozaik2.gif"];
	
	var imgNb = Math.floor(Math.random()*imgArray.length);
	return imgArray[imgNb];
};

function get_date()
{
	test = new Date()
	month = test.getMonth()
	month = (month * 1) + 1
	day = test.getDate()
	year = test.getFullYear()
	document.write(" ",month,"/",day,"/",year," ")
	return (" ",month,"/",day,"/",year," ")
};

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
};

function get_random_color2(r,g,b,a,v)
{
	var r2 = clamp_color(Math.floor(Math.random()*255*v+r));
	var g2 = clamp_color(Math.floor(Math.random()*255*v+g));
	var b2 = clamp_color(Math.floor(Math.random()*255*v+b));
	var str = 'rgba('+ r2 +','+ g2 +','+ b2 +',1)';
	return str;
};

function clamp_color(c)
{
	if(c<0)return 0;
	else if(c>255)return 255;
	else return c;
};

function random_checker(red,green,blue,resolution,canvasid,variance)
{
	var canvas = document.getElementsByClassName('checker')[canvasid],
    ctx = null,
    grad = null;
    
	var x = y = 0;
	var size = resolution;
	
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');
		resx = Math.round(canvas.width/size);
		resy = Math.round(canvas.height/size);
			
		for(var i=0;i<resy;i++)
		{
			for(var j=0;j<resx;j++)
			{	
				var color = get_random_color2(red,green,blue,1,variance);
				
				ctx.fillStyle   = color;
				ctx.fillRect(x,y,size,size);
				x += size;
			}
			y +=size;
			x=0;
		}
	}
	
	setTimeout(function(){random_checker(red,green,blue,resolution,canvasid,variance);},250);

};

function random_checker2(red,green,blue,resolution,canvasid,variance)
{
	var canvas = document.getElementsByClassName('checker')[canvasid],
    ctx = null,
    grad = null;
    
	var x = y = 0;
	var size = resolution;
	
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');
		resx = Math.round(canvas.width/size);
		resy = Math.round(canvas.height/size);
			
		for(var i=0;i<resy;i++)
		{
			for(var j=0;j<resx;j++)
			{	
				var color = get_random_color2(red,green,blue,1,variance);
				
				// Set the style properties.
				ctx.fillStyle   = color;
				ctx.strokeStyle = color;
				ctx.lineWidth   = 1;

				ctx.beginPath();
				ctx.moveTo(x + Math.random(), y + Math.random()); // give the (x,y) coordinates
				ctx.lineTo(x+size, y);
				ctx.lineTo(x+size, y+size);
				ctx.lineTo(x, y+size);
				
				// Done! Now fill the shape, and draw the stroke.
				// Note: your shape will not be visible until you call any of the two methods.
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				x += size;
			}
			y +=size;
			x=0;
		}
	}
	
	setTimeout(function(){random_checker(red,green,blue,resolution,canvasid,variance);},250);

};