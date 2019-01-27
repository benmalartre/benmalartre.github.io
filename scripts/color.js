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

function GetRandomColor(r=1.0,g=1.0,b=1.0){
	var r1 = ClampColor(Math.floor(Math.random()*255*v+r));
	var g1 = ClampColor(Math.floor(Math.random()*255*v+g));
	var b1 = ClampColor(Math.floor(Math.random()*255*v+b));
	var a1 = Math.random()*0.5+0.25;
	var color = new BaseColor(r1,g1,b1,a1);

	return color;
};