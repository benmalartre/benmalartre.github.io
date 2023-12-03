
function buildHome() {
    console.log("build home...");
    let content = document.createElement('div');
    content.style.textAlign = 'center';
    content.style.color = 'rgb(0, 0, 0)';

    let canvas = document.createElement('canvas'); 
    canvas.id = "canvas";
    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.style.imageRendering = "optimizeSpeed";             /* Legal fallback */
	canvas.style.imageRendering = "-moz-crisp-edges";          /* Firefox        */
	canvas.style.imageRendering = "-o-crisp-edges";            /* Opera          */
	canvas.style.imageRendering = "-webkit-optimize-contrast"; /* Safari         */
	canvas.style.imageRendering = "optimize-contrast";         /* CSS3 Proposed  */
	canvas.style.imageRendering = "crisp-edges";               /* CSS4 Proposed  */
	canvas.style.imageRendering = "pixelated";                 /* CSS4 Proposed  */
	canvas.style.msInterpolationMode = "nearest-neighbor";     /* IE8+           */

    content.appendChild(canvas);

    app.content.Clear();
    app.content.Mount(content);
    let automata = new CellularAutomata(64, 32);
    console.log("automata : " + automata);
    app.content.SetData(automata);
}

includeScript('scripts/automata.js', buildHome);
