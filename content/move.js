alert('BOUGE!!!');
var container = document.createElement('div');
container.style.position = 'fixed';
container.style.width = '800px';
container.style.height = '600px';
container.style.margin = 'auto';
container.style.background = 'white';
container.getElementsByTagName.zIndex = 12;
app.content.Clear();
app.content.Mount(container);

var elem = document.createElement('div');
elem.style.position = 'relative';
elem.style.width = '80px';
elem.style.height = '60px';
elem.style.background = 'black';
container.appendChild(elem);

for (var i = 1; i <= 64; i++) {
    (function(index) {
        setTimeout(function() { 
            elem.style.left = index*10; 
            elem.style.top = index*10;
        }, i * 250);
    })(i);
}