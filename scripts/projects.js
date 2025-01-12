"use strict";

var buildProjectsCallback=function(projects, data) {
    var descs = JSON.parse(data);
    //let text = "<table border='1'>";
    
    descs.forEach(function (desc, index) {

        /*

        "name": "toonix",      
        "label": "Toonix",      
        "description": "Toonix is a set of custom C++ ICE Nodes to generate Toon Lines, it supports Silhouette Detection, Boundary Detection,Intersection Detection(WIP) Crease Detection, Edge Cluster Detection, as well as experimental light and shadow approximation. It outputs on-the-fly polymesh geometry.",
        "thumb": "../images/softimage/toonix.jpg",
        "url": "https://github.com/benmalartre/Toonix"

        */
        //text += "<tr><td>" + desc.details + "</td></tr>";
        var project = document.createElement('section');
        var name = document.createElement('h1');
        name.innerHTML = desc.label;

        var description = document.createElement('div');
        description.innerHTML = desc.description;

        var thumb = document.createElement('img');
        thumb.src = desc.thumb;
        thumb.width = '256';

        var github = document.createElement('img');
        github.src = '../images/github-mark.png';
        github.width = '32';
        github.height = '32';

        var link = document.createElement('a');
        link.title = desc.url;
        link.href = desc.url;
        var url = document.createTextNode(desc.name);
        link.appendChild(url);
        
        project.appendChild(name);
        project.appendChild(description);
        project.appendChild(thumb);
        project.appendChild(github);
        project.appendChild(link);

        projects.elem.appendChild(project);

    });

    //text += "</table>";
    //cv.elem.innerHTML = text;
}

function Projects_t(name) {
	this.numEntries = 0;
	this.items = new Array();
	this.elem = document.createElement('div');
    this.elem.id = 'projects';
	loadJSON(this, buildProjectsCallback, 'datas/'+name+'.json', true);

    this.needUpdate = false;
    this.Update = function(){};
    return this;
};