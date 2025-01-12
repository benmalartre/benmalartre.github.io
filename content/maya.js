function buildProjects() {
  let projects = new Projects_t("maya");

  app.content.Clear();
  app.content.Mount(projects);
}

includeCSS('css/projects.css');
includeScript('scripts/projects.js', buildProjects);