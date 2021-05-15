"use strict";
var COLOR_TABLE = new Array();
// color class
function Color(r,g,b,a){
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
};


// clamp color
function ClampColor(c){
	if(c<0)return 0;
	else if(c>255)return 255;
	else return c;
};

function GetColorString(color){
	return 'rgba('+ color.r +','+ color.g +','+ color.b +','+color.a+')';
};

function GetColorHex(color){
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1,7);
}

function GetRandomColor(r,g,b, variance){
	var r1 = ClampColor(Math.floor(Math.random()*255*(variance||1)+(r||0.5)));
	var g1 = ClampColor(Math.floor(Math.random()*255*(variance||1)+(g||0.5)));
	var b1 = ClampColor(Math.floor(Math.random()*255*(variance||1)+(b||0.5)));
	var a1 = Math.random()*0.5+0.25;
	var color = new Color(r1,g1,b1,a1);

	return color;
};

for(var i=0;i<32;i++){
	COLOR_TABLE.push(GetColorHex(GetRandomColor(64,64,64,0.75)));
}