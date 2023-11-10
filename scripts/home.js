
var content = document.createElement('div');
content.style.textAlign = 'center';
content.style.color = 'rgb(0, 0, 0)';

var date = document.createElement('h1');
date.textContent = "Hello I'm ben";
var place = document.createElement('h2');
place.textContent = "Some How Some Where...";
var enroll = document.createElement('h3');
enroll.textContent = "Here are some of my research and development materials.";
var img = new Image();
img.src = ''
img.style.position = 'absolute';
img.style.left = '0px';
img.style.top = '0px';

content.appendChild(img);
content.appendChild(date);
content.appendChild(place);
content.appendChild(enroll);

app.content.Clear();
app.content.Mount(content);

