MAKE_REQUEST('get', 'scripts/automata.js', null, 'text/script');

let content = document.createElement('div');
content.style.textAlign = 'center';
content.style.color = 'rgb(0, 0, 0)';

let canvas = document.createElement('canvas'); 
canvas.id = "canvas";
canvas.style.position = 'absolute';
canvas.style.left = '0px';
canvas.style.top = '0px';

let automata = new CellularAutomata(64, 32);

content.appendChild(canvas);

app.content.Clear();
app.content.Mount(content);
