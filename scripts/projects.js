"use strict";

var buildProjectsCallback=function(projects, data) {
    var descs = JSON.parse(data);
    
    descs.forEach(function (desc, index) {

        var project = document.createElement('section');
        var name = document.createElement('h1');
        name.innerHTML = desc.label;
        name.style.paddingLeft = '24px';

        var description = document.createElement('div');
        description.innerHTML = desc.description;
        description.style.paddingLeft = '12px';

        var thumb = document.createElement('img');
        thumb.src = desc.thumb;
        thumb.width = '320';
        thumb.style.paddingLeft = '14px';

        project.appendChild(name);
        project.appendChild(description);
        project.appendChild(thumb);

        if(desc.url) {
            var github = document.createElement('img');
            github.src = '../images/github-mark.png';
            github.width = '32';
            github.height = '32';

            var link = document.createElement('a');
            link.title = desc.url;
            link.href = desc.url;
            var url = document.createTextNode(desc.name);
            
            link.appendChild(github);
            link.appendChild(url);

            project.appendChild(link);
        }

        projects.elem.appendChild(project);

    });
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