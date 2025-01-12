function buildProjects() {
    let projects = new Projects_t("softimage");

    app.content.Clear();
    app.content.Mount(projects);
}

includeCSS('css/projects.css');
includeScript('scripts/projects.js', buildProjects);


