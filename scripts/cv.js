"use strict";

var buildCVCallback=function(cv, data) {
    var descs = JSON.parse(data);
    //let text = "<table border='1'>";
    
    descs.forEach(function (desc, index) {
        //text += "<tr><td>" + desc.details + "</td></tr>";
        var section = document.createElement('section');
        var place = document.createElement('div');
        place.class = 'place';
        place.innerHTML = desc.location;

        var job = document.createElement('div');
        job.class = 'job';
        job.innerHTML = desc.details;

        section.appendChild(place);
        section.appendChild(job);

        cv.elem.appendChild(section);

    });

    //text += "</table>";
    //cv.elem.innerHTML = text;
}

function CV_t(parent) {
	this.numEntries = 0;
	this.items = new Array();
	this.elem = document.createElement('div');
    this.elem.id = 'content';
	loadJSON(this, buildCVCallback, 'datas/cv.json', true);
};