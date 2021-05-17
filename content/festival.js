
/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    
    if(this.readyState == 4 && this.status == 200) {
        app.infos.elem.innerHTML = this.responseText;
    }
    return false;
};
*/
var content = document.createElement('div')
content.style.textAlign = 'center';
content.style.color = 'rgb(240, 217, 205)';

var date = document.createElement('h1');
date.textContent = "du 29 septembre au 28 octobre";
var place = document.createElement('h2');
place.textContent = "Maxéville / Nancy";
var enroll = document.createElement('h3');
enroll.textContent = "réserver vos places dès maintenant";
var img = new Image();
img.src = ''
img.style.position = 'absolute';
img.style.left = '0px';
img.style.top = '0px';

//content.appendChild(img);
content.appendChild(date);
content.appendChild(place);
content.appendChild(enroll);

app.content.Clear();
app.content.Mount(content);

