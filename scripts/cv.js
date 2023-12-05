"use strict";

var buildCVCallback=function(cv, data) {
    var descs = JSON.parse(data);
    //let text = "<table border='1'>";
    
    descs.forEach(function (desc, index) {
        //text += "<tr><td>" + desc.details + "</td></tr>";
        var section = document.createElement('section');
        var place = document.createElement('div');
        place.id = 'place';
        place.innerHTML = desc.location;

        var job = document.createElement('div');
        job.id = 'job';
        job.innerHTML = desc.details;

        section.appendChild(place);
        section.appendChild(job);

        cv.elem.appendChild(section);

    });

    //text += "</table>";
    //cv.elem.innerHTML = text;
}

function CV_t() {
	this.numEntries = 0;
	this.items = new Array();
	this.elem = document.createElement('div');
    this.elem.id = 'cv';
	loadJSON(this, buildCVCallback, 'datas/cv.json', true);
    return this;
};