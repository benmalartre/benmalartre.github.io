"use strict";

var buildCVCallback=function(cv, data) {
    var descs = JSON.parse(data);
    let text = "<table border='1'>";
    
    descs.forEach(function (desc, index) {
        text += "<tr><td>" + desc.details + "</td></tr>";
        
    });

    text += "</table>";
    cv.elem.innerHTML = text;
}

function CV_t(parent) {
	this.numEntries = 0;
	this.items = new Array();
	this.elem = document.createElement('div');
    this.elem.id = 'content';
	loadJSON(this, buildCVCallback, 'datas/cv.json', true);
};