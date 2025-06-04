"use strict";

var buildProjectsCallback=function(projects, data) {
    var descs = JSON.parse(data);

    var overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';

    var popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'popup';

    var popupHead = document.createElement('div');
    popupHead.className = 'popup-header';

    var popupTitle = document.createElement('span');
    popupTitle.className = 'popup-title';
    popupTitle.id = 'popupTitle';
    popupTitle.innerHTML = descs[0].label;

    var closeBtn = document.createElement('div');
    closeBtn.id = 'close-btn';
    closeBtn.innerHTML = '✖';
    closeBtn.className = 'close-btn';

    var popupBody = document.createElement('div');
    popupBody.className = 'popup-body';

    var popupImg = document.createElement('img');
    popupImg.src = descs[0].thumb;
    popupImg.id = "popup-image";

    popupHead.appendChild(popupTitle);
    popupHead.appendChild(closeBtn);

    popupBody.appendChild(popupImg);

    popup.appendChild(popupHead);
    popup.appendChild(popupBody);

    projects.elem.appendChild(overlay);
    projects.elem.appendChild(popup);
    
    descs.forEach(function (desc, index) {

        var project = document.createElement('section');
        var name = document.createElement('h1');
        name.innerHTML = desc.label;
        name.style.paddingLeft = '24px';

        var description = document.createElement('div');
        description.innerHTML = desc.description;
        description.style.paddingLeft = '12px';

        var thumb = document.createElement('img');
        thumb.className = 'thumb';
        thumb.src = desc.thumb;
        thumb.width = '320';
        thumb.style.paddingLeft = '14px';
        thumb.setAttribute('title', desc.label);

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

        thumb.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('thumb')) {
                const largeSrc = e.target.src;
                popupImg.src = largeSrc;
                popupTitle.innerHTML = e.target.getAttribute('title');
                popup.style.display = 'block';
                overlay.style.display = 'block';
            }
        });

        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });

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