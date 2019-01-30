function Title(object,time)
{
	this.born = time;
	this.object = object;
	this.spacing = Math.sin(time);
	this.basespacing = 100;
}

function AnimateTitles(){
	// Init
	var objects = document.getElementsByClassName("title");
	this.titles = new Array(objects.length);
	this.d = new Date();
	this.t = this.d.getTime();
	for(i=0;i<objects.length;i++)
	{
		this.titles[i] = new Title(objects[i],this.t);
		this.t = this.d.getTime();
	}
	
	// Update
	this.Update = function()
	{
		
		for(i=0;i<this.titles.length;i++)
		{
		if(this.titles[i].object.className=="stateOne
			//this.titles[i].object.style["letter-spacing"] = Math.sin(d.getTime());//this.titles[i].spacing;
			//this.titles[i].spacing += 100;//Math.sin(t.getTime()-this.titles[i].born)*100;
		}
		
		setTimeout(function(){this.Update();},250);
	}
	
	Update();
}