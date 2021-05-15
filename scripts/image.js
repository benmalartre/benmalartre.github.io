
function addImage(filename, parentname){
	this.img = document.createElement("img");
	this.img.src = filename;
	if(parentname){
		src = getElementById(parentname);
		src.appendChild(this.img)
	}
	else document.body.appendChild(this.img);
}