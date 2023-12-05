function buildProjects() {
    let projects = new Projects_t();

    app.content.Clear();
    app.content.Mount(projects);
}

includeCSS('css/projects.css');
includeScript('scripts/projects.js', buildProjects);


