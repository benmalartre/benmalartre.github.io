function buildCV() {
    let cv = new CV_t(document);

    app.content.Clear();
    app.content.Mount(cv);
}

includeCSS('css/cv.css');
includeScript('scripts/cv.js', buildCV);


