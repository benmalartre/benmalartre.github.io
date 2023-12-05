
function buildHome() {
    let automata = new CellularAutomata(128, 64);
    app.content.Clear();
    app.content.Mount(automata);
}

includeScript('scripts/automata.js', buildHome);
