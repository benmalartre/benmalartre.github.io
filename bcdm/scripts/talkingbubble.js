function WritingLine(text,context,id){
	this.nbc = text.length;
	this.txt = text;
	this.ctx = context;
	this.ctx.font = "22px Verdana";
	this.ctx.letterSpacing = "100px";
	this.ctx.fillStyle = 'white';
	this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 6;
    this.ctx.shadowOffsetX = 5;
    this.ctx.shadowOffsetY = 5;
	this.id = id;
	this.tick = -1;
	
	this.Init = function(){
		this.tick = -1;
		this.writing = false;
		this.offset=0;
		this.subtext="";
		this.offsets = new Array(this.nbc);
		var offset = 0;
		for(var i=0;i<this.nbc;i++){
			var chr = this.txt.charAt(i);
			this.offsets[i]=offset;
			var w = this.ctx.measureText(chr).width*1;
			offset+=w;
		}
	};
	
	this.Start=function(){this.writing=true;};
	
	this.Draw = function(){
		if(this.writing){
			var chr = this.txt.charAt(this.tick);
			if(chr!=".")
				this.ctx.fillText(chr,this.offsets[this.tick],30+30*this.id);
		}
	};
	
	this.Update = function(){
		if(this.writing){
			this.tick++;
			if(this.tick>=this.nbc){
				this.writing=false;
				return false;
			}
			this.Draw();
		}return this.writing;
	};
	
}


function TalkingBubble(message,in_width,in_height){

	this.type = "bubble";	
	this.canvas = document.getElementById("bubble");
	this.canvas.width = in_width;
	this.canvas.height = in_height;
	this.context = this.canvas.getContext("2d");
	this.message = message;
	this.split = this.message.split(".");
	this.nbl = this.split.length-1;
	this.lines = new Array(this.nbl);
	this.counter = 0;
	this.paused = false;
	
	for(var i=0;i<this.nbl;i++){
		this.lines[i] = new WritingLine(this.split[i]+".",this.context,i);
		this.lines[i].Init();
	}
	
	this.lines[0].Start();
	this.cid = 0;
	this.Update = function(mx,my){
		if(!this.paused){
			if (!this.lines[this.cid].Update()){
				this.cid = Math.floor((this.cid+1)%this.nbl);
				this.paused=true;
				this.counter = 0;
			}

			this.counter++;
			
		}
		else{
			if(this.counter<20)
			{
				this.counter++;
				
			}
			else
			{
				if(this.cid==0){
					this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
					for(var l=0;l<this.nbl;l++){
						this.lines[l].writing = true;
						this.lines[l].tick = -1;
					}
				}
				this.lines[this.cid].Start();
				this.paused=false;
				this.counter=0;
			}
		}
	};
	
}