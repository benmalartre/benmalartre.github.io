function OWindowSize(x,y)
{
	this.width = x;
	this.height = y;
}

function GetWindowSize()
{
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName("body")[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight || e.clientHeight || g.clientHeight;
	o = new OWindowSize(x,y);
	return o;
}