"use strict";

var buildCVCallback=function(cv, data) {
    var descs = JSON.parse(data);
    
    descs.forEach(function (desc, index) {
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
}

function CV_t() {
	this.numEntries = 0;
	this.items = new Array();
	this.elem = document.createElement('div');
    this.elem.id = 'cv';
    this.needUpdate = false;
	loadJSON(this, buildCVCallback, 'datas/cv.json', true);

    this.Update = function(){};
    return this;
};